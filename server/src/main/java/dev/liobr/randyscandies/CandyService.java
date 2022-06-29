package dev.liobr.randyscandies;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Objects;
import java.util.Map;
import org.javatuples.Pair;

import java.io.IOException;
import java.io.InputStream;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import dev.liobr.randyscandies.distributors.*;
import dev.liobr.randyscandies.inventory.*;


public class CandyService {
    private static final String inventoryFilename = "Inventory.xlsx";
    private static final String distributorsFilename = "Distributors.xlsx";
    private static final String storeName = "Randy's Candies";
    private static final String[] distributorNames = {
        "Candy Corp",
        "The Sweet Suite",
        "Dentists Hate Us"
    };

    private static InputStream getWorkbookInputStream(String fileName) throws IOException {
        ClassLoader classLoader = CandyService.class.getClassLoader();
        InputStream stream = classLoader.getResourceAsStream(fileName);

        if (stream == null) {
            throw new IOException(fileName + " not found.");
        } else {
            return stream;
        }
    }

    private static Sheet getInventoryWorksheet()
            throws IOException,
            MissingWorksheetException
    {
        InputStream file = getWorkbookInputStream(inventoryFilename);
        Workbook workbook = new XSSFWorkbook(file);
        Sheet sheet = workbook.getSheet(storeName);
        workbook.close();

        if (sheet == null) {
            throw new MissingWorksheetException(storeName);
        }

        return sheet;
    }

    private static ArrayList<Sheet> getDistributorWorksheets()
            throws IOException,
            MissingWorksheetException
    {
        InputStream file = getWorkbookInputStream(distributorsFilename);
        Workbook workbook = new XSSFWorkbook(file);
        ArrayList<Sheet> sheets = new ArrayList<>();

        for (String distributorName : distributorNames) {
            Sheet sheet = workbook.getSheet(distributorName);

            if (sheet == null) {
                workbook.close();
                throw new MissingWorksheetException(distributorName);
            }

            sheets.add(sheet);
        }

        workbook.close();
        return sheets;
    }

    public static ArrayList<InventoryItem> getItems(boolean filterLowStock)
            throws IOException,
            MissingWorksheetException,
            InvalidInventoryColumnException,
            InvalidInventoryItemFieldException
    {
        ArrayList<InventoryItem> items = new ArrayList<>();
        Iterator<Row> rows = getInventoryWorksheet().rowIterator();

        while (rows.hasNext()) {
            Row row = rows.next();

            if (row.getRowNum() == 0) {
                continue;
            }

            InventoryItem item = new InventoryItem();

            for (Cell cell : row) {
                String columnName = InventoryColumns.getName(cell.getColumnIndex());

                if (cell.getCellType() == CellType.STRING) {
                    item.set(columnName, cell.getStringCellValue());
                } else if (cell.getCellType() == CellType.NUMERIC) {
                    item.set(columnName, (int) cell.getNumericCellValue());
                }
            }

            if (!filterLowStock) {
                items.add(item);
            } else if ((double) item.getStock() / item.getCapacity() < 0.25) {
                items.add(item);
            }
        }

        return items;
    }

    public static double getRestockCost(HashMap<Integer, Pair<Integer, Double>> cart)
            throws IOException,
            MissingWorksheetException,
            InvalidDistributorColumnException,
            MissingDistributorItemException
    {
        for (Sheet sheet : getDistributorWorksheets()) {
            Iterator<Row> rows = sheet.rowIterator();

            while (rows.hasNext()) {
                Row row = rows.next();

                if (row.getRowNum() == 0) {
                    continue;
                }

                DistributorItem item = new DistributorItem();

                for (Cell cell : row) {
                    String columnName = DistributorColumns.getName(cell.getColumnIndex());

                    if (Objects.equals(columnName, "id")) {
                        item.setId((int) cell.getNumericCellValue());
                    } else if (Objects.equals(columnName, "name")) {
                        item.setName(cell.getStringCellValue());
                    } else if (Objects.equals(columnName, "cost")) {
                        item.setCost(cell.getNumericCellValue());
                    }
                }

                Pair<Integer, Double> cartItem = cart.get(item.getId());

                if (!(cartItem == null) && item.getCost() < cartItem.getValue1()) {
                    cart.replace(
                        item.getId(),
                        new Pair<>(cartItem.getValue0(), item.getCost())
                    );
                }
            }
        }

        double restockCost = 0.0;

        for (Map.Entry<Integer, Pair<Integer, Double>> cartItem : cart.entrySet()) {
            int id = cartItem.getKey();
            int quantity = cartItem.getValue().getValue0();
            double cost = cartItem.getValue().getValue1();

            if (!(cost < Double.POSITIVE_INFINITY)) {
                throw new MissingDistributorItemException(id);
            }

            restockCost += quantity * cost;
        }

        return restockCost;
    }
}
