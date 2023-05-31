package com.wfproject.rest.impl;

import com.fasterxml.jackson.jaxrs.json.JacksonJsonProvider;
import com.wfproject.api.WeatherResponse;
import com.wfproject.api.WeatherService;
import lombok.RequiredArgsConstructor;
import org.apache.cxf.jaxrs.client.JAXRSClientFactory;

import java.io.IOException;
import java.util.Collections;

@RequiredArgsConstructor
public class WeatherServiceImpl implements WeatherService {

//    private final WeatherApi weatherApi;
//    private final WeatherMapper weatherMapper;

    @Override
    public WeatherResponse getCurrentWeather(String countryCode, String city, String units) throws IOException {
        if (units == null) {
            units = "metric";
        }
        String locationQuery = city.concat(",").concat(countryCode);

        WeatherApi weatherApi = JAXRSClientFactory.create("http://api.openweathermap.org",
                WeatherApi.class,
                Collections.singletonList(new JacksonJsonProvider()));


        return
//        String response =
                weatherApi.getCurrentWeather(
                locationQuery,
                units,
                "dbb3fe174b786223a4226efa0713e335");

//        return weatherMapper.deserialize(response);

    }

}
