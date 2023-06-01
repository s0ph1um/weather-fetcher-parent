package com.wfproject.rest.impl.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString // todo remove
@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class WeatherApiResponse {
    @JsonProperty("sys")
    private Sys sys;

    @JsonProperty("main")
    private WeatherDetail main;


    @JsonProperty("weather")
    private List<Weather> weather;

    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Weather {
        private String icon;

    }


//    @Getter
//    @Setter
//    @ToString
    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Sys {
        private long sunrise;
        private long sunset;

    }

//    @Getter
//    @Setter
//    @ToString
    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class WeatherDetail {
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
}
