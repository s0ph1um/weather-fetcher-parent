package com.wfproject.rest.impl;

import lombok.Data;

@Data
public class OpenWeatherQueryParams {

    private String apiKey;
    private String measureUnits;

}
