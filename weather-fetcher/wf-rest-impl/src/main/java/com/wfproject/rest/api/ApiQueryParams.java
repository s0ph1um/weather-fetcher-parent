package com.wfproject.rest.api;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ApiQueryParams {

    private String apiKey;
    private String measureUnits;

}
