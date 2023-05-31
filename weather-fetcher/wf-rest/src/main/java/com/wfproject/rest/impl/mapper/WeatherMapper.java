package com.wfproject.rest.impl.mapper;

import com.wfproject.api.WeatherResponseDto;
import com.wfproject.rest.impl.ApiResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;


@Mapper
public interface WeatherMapper {

    public static WeatherMapper create() {
        return Mappers.getMapper(WeatherMapper.class);
    }

//    @Override
//    public WeatherResponse deserialize(String content) throws IOException {
//        WeatherResponse response = new WeatherResponse();
//
//        JsonNode rootNode = new ObjectMapper().readTree(content);
//        response.setTemp(Double.parseDouble(rootNode.path("main").path("temp").asText()));
//        response.setFeelsLike(Double.parseDouble(rootNode.path("main").path("feelsLike").asText()));
//        response.setTempMin(Double.parseDouble(rootNode.path("main").path("tempMin").asText()));
//        response.setTempMax(Double.parseDouble(rootNode.path("main").path("tempMax").asText()));
//        response.setPressure(Double.parseDouble(rootNode.path("main").path("pressure").asText()));
//        response.setHumidity(Double.parseDouble(rootNode.path("main").path("humidity").asText()));
//
//        return response;
//    }

    //    @Mapping(target = "{}", source = "main")
    @Mapping(source = "main.temp", target = "temp")
    @Mapping(source = "main.feelsLike", target = "feelsLike")
    @Mapping(source = "main.tempMin", target = "tempMin")
    @Mapping(source = "main.tempMax", target = "tempMax")
    @Mapping(source = "main.pressure", target = "pressure")
    @Mapping(source = "main.humidity", target = "humidity")
//    @Mapping(target = "main.temp")
//    @Mapping(target = "main.feels_like")
//    @Mapping(target = "main.temp_min")
//    @Mapping(target = "main.temp_max")
//    @Mapping(target = "main.pressure")
//    @Mapping(target = "main.humidity")
    WeatherResponseDto openWeatherModelToWeatherModel(ApiResponse openWeatherModel);

}
