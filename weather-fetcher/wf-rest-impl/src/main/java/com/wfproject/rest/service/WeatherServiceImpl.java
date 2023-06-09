package com.wfproject.rest.service;

import com.wfproject.api.WeatherResponseDto;
import com.wfproject.api.WeatherService;
import com.wfproject.persistence.entity.RequestData;
import com.wfproject.persistence.repository.RequestDataRepository;
import com.wfproject.rest.api.ApiQueryParams;
import com.wfproject.rest.api.OpenWeatherApi;
import com.wfproject.rest.mapper.WeatherResponseMapper;
import com.wfproject.rest.model.WeatherResponse;
import lombok.AllArgsConstructor;
import lombok.NonNull;

import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Response;

@AllArgsConstructor
public class WeatherServiceImpl implements WeatherService {

    private final ApiQueryParams queryParams;
    private final WeatherResponseMapper weatherResponseMapper;
    private final OpenWeatherApi weatherApi;
    private final RequestDataRepository requestDataRepo;

    @Override
    public WeatherResponseDto getCurrentWeather(@NonNull() String countryCode, @NonNull String city) {

        WeatherResponse response = getWeatherResponse(countryCode, city);
        System.out.println(response);

        requestDataRepo.save(
                RequestData.builder()
                        .city(city)
                        .countryCode(countryCode)
                        .date(System.currentTimeMillis())
                        .code(response.getApiResponseCode())
                        .message(response.getApiResponseMessage())
                        .isSuccessful(response.getApiResponseCode() == 200)
                        .build()
        );

        return weatherResponseMapper.weatherResponseToWeatherResponseDto(response);
    }

    private WeatherResponse getWeatherResponse(String countryCode, String city) {

        WeatherResponse apiResponse;

        try {
            if (countryCode.length() != 2) {
                throw new WebApplicationException(
                        "Use alpha-2 country code as a 'country' parameter. E.g., FR, US (not FRA or USA)",
                        Response.Status.BAD_REQUEST);
            }

            apiResponse = weatherApi.getCurrentWeather(
                    city.concat(",").concat(countryCode),
                    queryParams.getMeasureUnits(),
                    queryParams.getApiKey());

            apiResponse.setApiResponseMessage(Response.Status.OK.name());
            apiResponse.setWeatherCondition(apiResponse.getWeatherConditions().get(0));

        } catch (WebApplicationException exception) {
            apiResponse = WeatherResponse.builder()
                    .apiResponseCode(exception.getResponse().getStatus())
                    .apiResponseMessage(exception.getMessage())
                    .build();
        }
        return apiResponse;
    }
}
