package com.wfproject.api;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString // todo remove
@Data
//@JsonIgnoreProperties(ignoreUnknown = true)
public class WeatherResponse {

    private WeatherDetail main;

}
