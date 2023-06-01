package com.wfproject.rest.impl.mapper;

import com.wfproject.api.WeatherResponse;
import com.wfproject.rest.impl.model.WeatherApiResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.mapstruct.factory.Mappers;

import java.util.List;


@Mapper
public interface WeatherMapper {

    static WeatherMapper init() {
        return Mappers.getMapper(WeatherMapper.class);
    }

    @Mappings({
            @Mapping(source = "main.temp", target = "temp"),
            @Mapping(source = "main.feelsLike", target = "feelsLike"),
            @Mapping(source = "main.tempMin", target = "tempMin"),
            @Mapping(source = "main.tempMax", target = "tempMax"),
            @Mapping(source = "main.pressure", target = "pressure"),
            @Mapping(source = "main.humidity", target = "humidity"),
//            @Mapping(source = "sys.sunrise", target = "sunrise"),
//            @Mapping(source = "sys.sunset", target = "sunset"),
//            @Mapping(target = "icon", expression = "java(weatherApiResponse.getWeather().get(0).getIcon())")
//            @Mapping(target = "icon", expression = "java(weather.get(0).getIcon())")
//            @Mapping(expression = "java(Arrays.asList(SubMapper.INSTANCE.dataToTransaction(weather)))", target = "icon")
//            @Mapping(expression = "java(weather.get(0))", target = "icon")

    })
//    @Mapping(target = "main.temp")
//    @Mapping(target = "main.feelsLike")
//    @Mapping(target = "main.tempMin")
//    @Mapping(target = "main.tempMax")
//    @Mapping(target = "main.pressure")
//    @Mapping(target = "main.humidity")})
    WeatherResponse apiResponseToWeatherResponse(WeatherApiResponse weatherApiResponse);


//    default WeatherApiResponse.Weather mapTransactionToList(List<WeatherApiResponse.Weather> source) {
//        return source;
//    }

}
