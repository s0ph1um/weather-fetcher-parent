package com.wfproject.api;

import lombok.*;

@AllArgsConstructor
@RequiredArgsConstructor
//@Getter
//@Setter
@ToString // todo remove
@Data
//@JsonIgnoreProperties(ignoreUnknown = true)
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
    private long datetime;

}
