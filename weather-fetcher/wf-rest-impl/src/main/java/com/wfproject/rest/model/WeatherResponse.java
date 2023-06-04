package com.wfproject.rest.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
//@Getter
//@Setter
@ToString // todo remove
@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class WeatherResponse {

    @JsonProperty("dt")
    private long measurementTimestamp;

    @JsonProperty("timezone")
    private long utcOffsetSeconds;

    @JsonProperty("sys")
    private DaytimeInfo daytimeInfo;

    @JsonProperty("main")
    private WeatherMetrics weatherMetrics;


    @JsonProperty("weather")
    private List<WeatherCondition> weatherConditions;

    private WeatherCondition weatherCondition;


    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class WeatherCondition {
        private String icon;
        private String description;

    }


//    @Getter
//    @Setter
//    @ToString
    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class DaytimeInfo {
        private long sunrise;
        private long sunset;

    }

//    @Getter
//    @Setter
//    @ToString
    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class WeatherMetrics {
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
