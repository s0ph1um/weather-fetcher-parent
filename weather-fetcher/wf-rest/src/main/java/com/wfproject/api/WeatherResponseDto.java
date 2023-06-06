package com.wfproject.api;

import lombok.*;

@AllArgsConstructor
@RequiredArgsConstructor
@ToString // todo remove
@Data
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
    private int apiResponseCode;
    private String apiResponseMessage;

}
