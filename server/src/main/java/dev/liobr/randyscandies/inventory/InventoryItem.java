package dev.liobr.randyscandies.inventory;

import java.util.Objects;


public class InventoryItem {
    private int id;
    private String name;
    private int stock;
    private int capacity;

    public InventoryItem() {
        this(0);
    }

    public InventoryItem(int id) {
        this(id, "");
    }

    public InventoryItem(int id, String name) {
        this(id, name, 0);
    }

    public InventoryItem(int id, String name, int stock) {
        this(id, name, stock, 0);
    }

    public InventoryItem(int id, String name, int stock, int capacity) {
        this.id = id;
        this.name = name;
        this.stock = stock;
        this.capacity = capacity;
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

    public int getStock() {
        return this.stock;
    }

    public void setStock(int stock) {
        this.stock = stock;
    }

    public int getCapacity() {
        return this.capacity;
    }

    public void setCapacity(int capacity) {
        this.capacity = capacity;
    }

    public void set(String field, String value) throws InvalidInventoryItemFieldException {
        if (Objects.equals(field, "name")) {
            this.setName(value);
            return;
        }

        throw new InvalidInventoryItemFieldException(field);
    }

    public void set(String field, int value) throws InvalidInventoryItemFieldException {
        switch(field) {
            case "id":
                this.setId(value);
                break;

            case "stock":
                this.setStock(value);
                break;

            case "capacity":
                this.setCapacity(value);
                break;

            default:
                throw new InvalidInventoryItemFieldException(field);
        }
    }
}
