package com.wfproject.rest.impl;

import com.fasterxml.jackson.jaxrs.json.JacksonJsonProvider;
import org.apache.cxf.jaxrs.client.JAXRSClientFactory;

import java.util.Collections;

public class WeatherApiProxy {

    public static OpenWeatherApi init(String domainUrl) {
        System.out.println("WeatherApi " + domainUrl);
        return JAXRSClientFactory.create(domainUrl,
                OpenWeatherApi.class,
                Collections.singletonList(new JacksonJsonProvider())
        );
    }

}