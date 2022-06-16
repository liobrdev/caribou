package dev.liobr.randyscandies.inventory;


public enum InventoryColumns {
    NAME(0, "name"),
    STOCK(1, "stock"),
    CAPACITY(2, "capacity"),
    ID(3, "id");

    private final int index;
    private final String name;

    InventoryColumns(int index, String name) {
        this.index = index;
        this.name = name;
    }

    public int getIndex() {
        return this.index;
    }

    public String getName() {
        return this.name;
    }

    public static String getName(int index) throws InvalidInventoryColumnException {
        for (InventoryColumns inventoryColumn : InventoryColumns.values()) {
            if (index == inventoryColumn.index) {
                return inventoryColumn.name;
            }
        }

        throw new InvalidInventoryColumnException(index);
    }
}
