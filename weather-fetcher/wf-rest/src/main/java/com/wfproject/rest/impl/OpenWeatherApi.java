package com.wfproject.rest.impl;

import com.wfproject.rest.impl.model.WeatherApiResponse;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;

@Path("/data/2.5")
public interface OpenWeatherApi {

    @Produces(MediaType.APPLICATION_JSON)
    @GET
    @Path("/weather")
    WeatherApiResponse getCurrentWeather(@QueryParam("q") String locationQuery,
                                         @DefaultValue("metric") @QueryParam("units") String units, // metric, standard, imperial
                                         @QueryParam("appid") String appId);

}
