package dev.liobr.randyscandies.distributors;


public class DistributorItem {
    private int id;
    private String name;
    private double cost;

    public DistributorItem() {
        this(0);
    }

    public DistributorItem(int id) {
        this(id, "");
    }

    public DistributorItem(int id, String name) {
        this(id, name, 0);
    }

    public DistributorItem(int id, String name, double cost) {
        this.id = id;
        this.name = name;
        this.cost = cost;
    }

    public int getId() {
        return this.id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getCost() {
        return this.cost;
    }

    public void setCost(double cost) {
        this.cost = cost;
    }
}
