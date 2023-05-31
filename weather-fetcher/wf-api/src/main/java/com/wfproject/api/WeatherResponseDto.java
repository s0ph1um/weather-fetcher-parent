package com.wfproject.api;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString // todo remove
@Data
//@JsonIgnoreProperties(ignoreUnknown = true)
public class WeatherResponseDto {

    //    private WeatherDetail main;
    private double temp;
    @JsonProperty("feels_like")
    private double feelsLike;

    @JsonProperty("temp_min")
    private double tempMin;

    @JsonProperty("temp_max")
    private double tempMax;
    private double pressure;
    private double humidity;
}
