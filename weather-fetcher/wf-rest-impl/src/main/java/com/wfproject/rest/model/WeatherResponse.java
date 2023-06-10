package com.wfproject.rest.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;
import lombok.extern.jackson.Jacksonized;

import java.util.List;

@Data
@Builder
@Jacksonized
@JsonIgnoreProperties(ignoreUnknown = true)
public class WeatherResponse {

    @JsonProperty("dt")
    private long measurementTimestamp;
    @JsonProperty("timezone")
    private long utcOffsetSeconds;
    @JsonProperty("name")
    private String city;
    @JsonProperty("sys")
    private DaytimeInfo daytimeInfo;
    @JsonProperty("main")
    private WeatherMetrics weatherMetrics;
    @JsonProperty("weather")
    private List<WeatherCondition> weatherConditions;
    private WeatherCondition weatherCondition;
    @JsonProperty("cod")
    private int apiResponseCode;
    @JsonProperty("message")
    private String apiResponseMessage;

    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class WeatherCondition {
        private String icon;
        private String description;
    }

    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class DaytimeInfo {
        private long sunrise;
        private long sunset;
        private String country;
    }

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
