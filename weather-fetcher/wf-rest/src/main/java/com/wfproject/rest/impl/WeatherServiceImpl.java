package com.wfproject.rest.impl;

import com.wfproject.api.WeatherResponseDto;
import com.wfproject.api.WeatherService;
import com.wfproject.rest.impl.mapper.WeatherResponseMapper;
import com.wfproject.rest.impl.model.WeatherResponse;
import lombok.AllArgsConstructor;

@AllArgsConstructor
public class WeatherServiceImpl implements WeatherService {

    private final OpenWeatherQueryParams queryParams;
    private final WeatherResponseMapper weatherResponseMapper;
    private final OpenWeatherApi weatherApi;


    @Override
    public WeatherResponseDto getCurrentWeather(String countryCode, String city, String units) {
//        System.out.println("API_KEY: " + queryParams.getApiKey());
        System.out.println("UNITS: " + queryParams.getMeasureUnits());
        String locationQuery = city.concat(",").concat(countryCode);
        WeatherResponse response =
                weatherApi.getCurrentWeather(
                        locationQuery,
                        queryParams.getMeasureUnits(),
                        queryParams.getApiKey());

        System.out.println(response);

        return weatherResponseMapper.apiResponseToWeatherResponse(response);
    }

}
