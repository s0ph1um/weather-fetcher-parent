package com.wfproject.rest.impl;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class OpenWeatherQueryParams {

    private String apiKey;
    private String measureUnits;

}
