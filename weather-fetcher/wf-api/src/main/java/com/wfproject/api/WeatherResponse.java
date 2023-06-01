package com.wfproject.api;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@AllArgsConstructor
@RequiredArgsConstructor
@Getter
@Setter
@ToString // todo remove
//@Data
//@JsonIgnoreProperties(ignoreUnknown = true)
public class WeatherResponse {

    //    private WeatherDetail main;
    private double temp;
    private double feelsLike;
    private double tempMin;
    private double tempMax;
    private double pressure;
    private double humidity;
    private long sunrise;
    private long sunset;
    private String icon;


}
