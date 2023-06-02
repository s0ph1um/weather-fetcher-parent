package com.wfproject.rest.impl;

import com.wfproject.api.WeatherResponse;
import com.wfproject.api.WeatherService;
import com.wfproject.rest.impl.mapper.WeatherMapper;
import com.wfproject.rest.impl.model.WeatherApiResponse;
import lombok.AllArgsConstructor;

import java.io.IOException;

//@RequiredArgsConstructor
@AllArgsConstructor
public class WeatherServiceImpl implements WeatherService {

    private final OpenWeatherQueryParams queryParams;
    private final WeatherMapper weatherMapper;
    private final OpenWeatherApi weatherApi;


    @Override
    public WeatherResponse getCurrentWeather(String countryCode, String city, String units) throws IOException {
        System.out.println("API_KEY: " + queryParams.getApiKey());
        System.out.println("UNITS: " + queryParams.getMeasureUnits());
        String locationQuery = city.concat(",").concat(countryCode);
        WeatherApiResponse response =
                weatherApi.getCurrentWeather(
                        locationQuery,
                        queryParams.getMeasureUnits(),
                        queryParams.getApiKey());

        return weatherMapper.apiResponseToWeatherResponse(response);

    }

}
