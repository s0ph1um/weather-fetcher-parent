//package com.wfproject.rest.impl;
//
//import com.fasterxml.jackson.jaxrs.json.JacksonJsonProvider;
//import org.apache.cxf.jaxrs.client.JAXRSClientFactory;
//
//import java.util.Collections;
//
//public class WeatherApiProxy {
//
//    public static WeatherApi create(String domainUrl) {
//        System.out.println("WeatherApi " + domainUrl);
//        return JAXRSClientFactory.create(domainUrl,
//                WeatherApi.class,
//                Collections.singletonList(new JacksonJsonProvider())
//        );
//    }
//
////    private WeatherApi weatherApi;
////
////    public WeatherServiceClient(String apiUrl) {
////        weatherService = JAXRSClientFactory.create(apiUrl, WeatherService.class);
////    }
////
////    public WeatherForecast getWeatherForecast(String city) {
////        return weatherService.getWeatherForecast(city);
////    }
//
//}