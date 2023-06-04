package com.wfproject.rest.service;

import com.wfproject.api.WeatherResponseDto;
import com.wfproject.api.WeatherService;
import com.wfproject.rest.api.ApiQueryParams;
import com.wfproject.rest.api.OpenWeatherApi;
import com.wfproject.rest.mapper.WeatherResponseMapper;
import com.wfproject.rest.model.WeatherResponse;
import lombok.AllArgsConstructor;

@AllArgsConstructor
public class WeatherServiceImpl implements WeatherService {

    private final ApiQueryParams queryParams;
    private final WeatherResponseMapper weatherResponseMapper;
    private final OpenWeatherApi weatherApi;


    @Override
    public WeatherResponseDto getCurrentWeather(String countryCode, String city) {

        String locationQuery = city.concat(",").concat(countryCode);
        WeatherResponse response =
                weatherApi.getCurrentWeather(
                        locationQuery,
                        queryParams.getMeasureUnits(),
                        queryParams.getApiKey());

        response.setWeatherCondition(response.getWeatherConditions().get(0));

        System.out.println(response);

        return weatherResponseMapper.weatherResponseToWeatherResponseDto(response);
    }

}
