package com.wfproject.rest.impl;

import com.wfproject.api.WeatherService;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class WeatherServiceImpl implements WeatherService {

    private final WeatherApi weatherApi;

    @Override
    public String getCurrentWeather(String countryCode, String city, String units) {
        if (units == null) {
            units = "metric";
        }
        String locationQuery = city.concat(",").concat(countryCode);

        String response =
                weatherApi.getCurrentWeather(
                locationQuery,
                units,
                "");

        return response;
    }

}
