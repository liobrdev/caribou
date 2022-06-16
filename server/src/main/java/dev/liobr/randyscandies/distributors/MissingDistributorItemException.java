package dev.liobr.randyscandies.distributors;


public class MissingDistributorItemException extends Exception {
    private final String message;

    public MissingDistributorItemException(int id) {
        this.message = String.format("Missing DistributorItem ID `%d`.", id);
    }

    @Override
    public String getMessage() {
        return this.message;
    }
}
