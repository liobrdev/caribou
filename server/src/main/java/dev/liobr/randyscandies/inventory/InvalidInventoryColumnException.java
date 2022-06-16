package dev.liobr.randyscandies.inventory;


public class InvalidInventoryColumnException extends Exception {
    private final String message;

    public InvalidInventoryColumnException(int index) {
        this.message = String.format("Invalid InventoryColumn at index %d.", index);
    }

    @Override
    public String getMessage() {
        return this.message;
    }
}
