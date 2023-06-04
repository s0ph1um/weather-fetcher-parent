package com.wfproject.rest.impl.mapper;

import com.wfproject.api.WeatherResponseDto;
import com.wfproject.rest.impl.model.WeatherResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;


@Mapper
public interface WeatherResponseMapper {

    static WeatherResponseMapper init() {
        return Mappers.getMapper(WeatherResponseMapper.class);
    }

    @Mapping(source = "measurementTimestamp", target = "measurementTimestamp")
    @Mapping(source = "utcOffsetSeconds", target = "utcOffsetSeconds")
    @Mapping(source = "daytimeInfo.sunrise", target = "sunrise")
    @Mapping(source = "daytimeInfo.sunset", target = "sunset")
    @Mapping(source = "weatherMetrics.temp", target = "temp")
    @Mapping(source = "weatherMetrics.feelsLike", target = "feelsLike")
    @Mapping(source = "weatherMetrics.tempMin", target = "tempMin")
    @Mapping(source = "weatherMetrics.tempMax", target = "tempMax")
    @Mapping(source = "weatherMetrics.pressure", target = "pressure")
    @Mapping(source = "weatherMetrics.humidity", target = "humidity")
    @Mapping(source = "weatherCondition.icon", target = "icon")
    @Mapping(source = "weatherCondition.description", target = "weatherDescription")
    WeatherResponseDto weatherResponseToWeatherResponseDto(WeatherResponse weatherResponse);

}
