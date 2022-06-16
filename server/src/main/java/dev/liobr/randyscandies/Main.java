package dev.liobr.randyscandies;

import spark.Request;
import spark.Response;
import static spark.Spark.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;
import org.javatuples.Pair;

import com.google.gson.Gson;


public class Main extends CandyService {
    private static final Gson gson = new Gson();
    private static final String environment = System.getenv("JAVA_ENV");

    private static String handleGetItems(Response res, boolean filterLowStock) throws Exception {
        String dump = gson.toJson(getItems(filterLowStock));
        res.body(dump);
        return dump;
    }

    private static String handleRestockCost(Request req, Response res) throws Exception {
        HashMap<?, ?> raw = new Gson().fromJson(req.body(), HashMap.class);
        HashMap<Integer, Pair<Integer, Double>> cart = new HashMap<>();

        for (Map.Entry<?, ?> entry : raw.entrySet()) {
            Object key = entry.getKey();
            Object value = entry.getValue();

            if (key instanceof String && value instanceof Double) {
                String itemId = (String) key;
                Double quantity = (Double) value;

                cart.put(
                        Integer.parseInt(itemId),
                        new Pair<>(quantity.intValue(), Double.POSITIVE_INFINITY)
                );
            } else {
                ErrorResponseBody errResBody = new ErrorResponseBody();
                errResBody.setDetail("Failed to parse request body.");
                halt(400, gson.toJson(errResBody));
            }
        }

        double cost = getRestockCost(cart);
        String dump = String.format("{\"lowestTotalRestockCost\":%.2f}", cost);
        res.body(dump);
        return dump;
    }

    public static void main(String[] args) {
        before((req, res) -> {
            String origin = Objects.equals(environment, "production") ?
                "https://randyscandies.liobr.dev" : "http://localhost:3000";
            res.header("Access-Control-Allow-Origin", origin);
        });

        exception(Exception.class, (exc, req, res) -> {
            ErrorResponseBody errResBody = new ErrorResponseBody();
            errResBody.setDetail(exc.getMessage());
            res.body(gson.toJson(errResBody));
            res.status(500);
        });

        notFound((req, res) -> "{\"detail\":\"Not found.\"}");

        options("/*", (req, res) -> {
            res.header("Access-Control-Allow-Headers", "content-type");
            res.header("Access-Control-Allow-Methods", "GET, POST");
            return "OK";
        });

        get("/items", (req, res) -> handleGetItems(res, false));
        get("/items/", (req, res) -> handleGetItems(res, false));
        get("/low-stock", (req, res) -> handleGetItems(res, true));
        get("/low-stock/", (req, res) -> handleGetItems(res, true));
        post("/restock-cost", Main::handleRestockCost);
        post("/restock-cost/", Main::handleRestockCost);

        afterAfter((req, res) -> res.type("application/json"));
    }
}
