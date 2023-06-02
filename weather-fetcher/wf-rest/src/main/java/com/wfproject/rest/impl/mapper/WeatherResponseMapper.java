package com.wfproject.rest.impl.mapper;

import com.wfproject.api.WeatherResponseDto;
import com.wfproject.rest.impl.model.WeatherResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.mapstruct.factory.Mappers;


@Mapper
public interface WeatherResponseMapper {

    static WeatherResponseMapper init() {
        return Mappers.getMapper(WeatherResponseMapper.class);
    }

//    @Mappings({
            @Mapping(source = "main.temp", target = "temp")
            @Mapping(source = "main.feelsLike", target = "feelsLike")
            @Mapping(source = "main.tempMin", target = "tempMin")
            @Mapping(source = "main.tempMax", target = "tempMax")
            @Mapping(source = "main.pressure", target = "pressure")
            @Mapping(source = "main.humidity", target = "humidity")
            @Mapping(source = "datetime", target = "datetime")
            @Mapping(source = "sys.sunrise", target = "sunrise")
            @Mapping(source = "sys.sunset", target = "sunset")
            @Mapping(target = "icon", expression = "java(weatherResponse.getWeather().get(0).getIcon())")
//            @Mapping(expression = "java(Arrays.asList(SubMapper.INSTANCE.dataToTransaction(weather)))", target = "icon")

//    })
    WeatherResponseDto apiResponseToWeatherResponse(WeatherResponse weatherResponse);

}
