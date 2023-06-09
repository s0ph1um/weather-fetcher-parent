package com.wfproject.api;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class WeatherResponseDto {

    private double temp;
    private double feelsLike;
    private double tempMin;
    private double tempMax;
    private double pressure;
    private double humidity;
    private long sunrise;
    private long sunset;
    private String icon;
    private String weatherDescription;
    private long measurementTimestamp;
    private long utcOffsetSeconds;
    private String city;
    private String country;
    private int apiResponseCode;
    private String apiResponseMessage;

}
