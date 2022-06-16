package dev.liobr.randyscandies;

import java.util.Collection;
import java.util.HashMap;
import org.javatuples.Pair;


public class ErrorResponseBody {
    private String detail;
    private HashMap<String, Collection<String>> fieldErrors;
    private Collection<String> nonFieldErrors;

    public String getDetail() {
        return this.detail;
    }

    public void setDetail(String detail) {
        this.detail = detail;
    }

    public HashMap<String, Collection<String>> getFieldErrors() {
        return this.fieldErrors;
    }

    public void setFieldErrors(Collection<Pair<String, Collection<String>>> fieldErrors) {
        HashMap<String, Collection<String>> fieldErrorMap = new HashMap<>();

        for (Pair<String, Collection<String>> pair : fieldErrors) {
            fieldErrorMap.put(pair.getValue0(), pair.getValue1());
        }

        this.fieldErrors = fieldErrorMap;
    }

    public void setFieldErrors(HashMap<String, Collection<String>> fieldErrors) {
        this.fieldErrors = fieldErrors;
    }

    public Collection<String> getNonFieldErrors() {
        return this.nonFieldErrors;
    }

    public void setNonFieldErrors(Collection<String> nonFieldErrors) {
        this.nonFieldErrors = nonFieldErrors;
    }
}
