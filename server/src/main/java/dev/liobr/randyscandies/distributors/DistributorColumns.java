package dev.liobr.randyscandies.distributors;

public enum DistributorColumns {
    NAME(0, "name"),
    ID(1, "id"),
    COST(2, "cost");

    private final int index;
    private final String name;

    DistributorColumns(int index, String name) {
        this.index = index;
        this.name = name;
    }

    public int getIndex() {
        return this.index;
    }

    public String getName() {
        return this.name;
    }

    public static String getName(int index) throws InvalidDistributorColumnException {
        for (DistributorColumns distributorColumn : DistributorColumns.values()) {
            if (index == distributorColumn.index) {
                return distributorColumn.name;
            }
        }

        throw new InvalidDistributorColumnException(index);
    }
}
