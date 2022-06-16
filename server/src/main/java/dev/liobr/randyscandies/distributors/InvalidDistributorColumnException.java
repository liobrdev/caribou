package dev.liobr.randyscandies.distributors;


public class InvalidDistributorColumnException extends Exception {
    private final String message;

    public InvalidDistributorColumnException(int index) {
        this.message = String.format("Invalid DistributorColumn at index %d.", index);
    }

    @Override
    public String getMessage() {
        return this.message;
    }
}
