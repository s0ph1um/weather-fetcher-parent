package com.wfproject.rest.impl;

import com.fasterxml.jackson.jaxrs.json.JacksonJsonProvider;
import com.wfproject.api.WeatherResponse;
import com.wfproject.api.WeatherService;
import com.wfproject.rest.impl.mapper.WeatherMapper;
import com.wfproject.rest.impl.model.WeatherApiResponse;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.apache.cxf.jaxrs.client.JAXRSClientFactory;

import java.io.IOException;
import java.util.Collections;
import java.util.Dictionary;

//@RequiredArgsConstructor
@AllArgsConstructor
public class WeatherServiceImpl implements WeatherService {

    private final WeatherMapper weatherMapper;
    private final OpenWeatherApi weatherApi;
    private final String API_KEY;
    private final String UNITS;


    @Override
    public WeatherResponse getCurrentWeather(String countryCode, String city, String units) throws IOException {
        System.out.println("API_KEY: " + API_KEY);
        System.out.println("UNITS: " + UNITS);
        String locationQuery = city.concat(",").concat(countryCode);
        WeatherApiResponse response =
                weatherApi.getCurrentWeather(
                        locationQuery,
                        UNITS,
                        API_KEY);

        return weatherMapper.apiResponseToWeatherResponse(response);

    }

}
