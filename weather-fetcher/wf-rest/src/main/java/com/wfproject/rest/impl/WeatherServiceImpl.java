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

    private final String API_KEY;
    private final WeatherMapper weatherMapper;
    private final OpenWeatherApi weatherApi;


    @Override
    public WeatherResponse getCurrentWeather(String countryCode, String city, String units) throws IOException {
        String locationQuery = city.concat(",").concat(countryCode);
        WeatherApiResponse response =
                weatherApi.getCurrentWeather(
                locationQuery,
                units,
                API_KEY);

        return weatherMapper.apiResponseToWeatherResponse(response);

    }

}
