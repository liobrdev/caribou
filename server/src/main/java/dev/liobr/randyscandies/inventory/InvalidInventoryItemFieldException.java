package dev.liobr.randyscandies.inventory;


public class InvalidInventoryItemFieldException extends Exception {
    private final String message;

    public InvalidInventoryItemFieldException(String field) {
        this.message = String.format("Invalid InventoryItem field \"%s\".", field);
    }

    @Override
    public String getMessage() {
        return this.message;
    }
}
