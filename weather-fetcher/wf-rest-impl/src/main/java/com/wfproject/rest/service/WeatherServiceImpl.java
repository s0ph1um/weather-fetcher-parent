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

import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Response;

@AllArgsConstructor
public class WeatherServiceImpl implements WeatherService {

    private final ApiQueryParams queryParams;
    private final WeatherResponseMapper weatherResponseMapper;
    private final OpenWeatherApi weatherApi;
    private final RequestDataRepository requestDataRepo;

    @Override
    public WeatherResponseDto getCurrentWeather(String countryCode, String city) {

        WeatherResponse response = getWeatherResponse(countryCode, city);

        requestDataRepo.save(
                RequestData.builder()
                        .city(city)
                        .countryCode(countryCode)
                        .date(System.currentTimeMillis())
                        .code(response.getApiResponseCode())
                        .message(response.getApiResponseMessage())
                        .isSuccessful(response.getApiResponseCode() == Response.Status.OK.getStatusCode())
                        .build()
        );

        return weatherResponseMapper.weatherResponseToWeatherResponseDto(response);
    }

    private WeatherResponse getWeatherResponse(String countryCode, String city) {

        WeatherResponse apiResponse;
        int alpha2CodeCharLimit = 2;

        try {
            if (countryCode.length() != alpha2CodeCharLimit) {
                throw new WebApplicationException(
                        Response.Status.BAD_REQUEST
                                .getReasonPhrase()
                                .concat(": Use alpha-2 country code as a 'country' parameter ('FR', 'US', etc)"),
                        Response.Status.BAD_REQUEST);
            }

            apiResponse = weatherApi.getCurrentWeather(
                    city.concat(",").concat(countryCode),
                    queryParams.getMeasureUnits(),
                    queryParams.getApiKey());

            apiResponse.setApiResponseMessage(Response.Status.OK
                    .getReasonPhrase()
                    .concat(": Weather Information response was successfully returned"));
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
