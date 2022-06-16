package dev.liobr.randyscandies;


public class MissingWorksheetException extends Exception {
    private final String message;

    public MissingWorksheetException(String worksheetName) {
        this.message = String.format("Worksheet \"%s\" not found.", worksheetName);
    }

    @Override
    public String getMessage() {
        return this.message;
    }
}
