package com.wfproject.rest.impl;

import com.wfproject.rest.impl.model.WeatherResponse;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;

@Path("/data/2.5")
public interface OpenWeatherApi {

    @Produces(MediaType.APPLICATION_JSON)
    @GET
    @Path("/weather")
    WeatherResponse getCurrentWeather(@QueryParam("q") String locationQuery,
                                      @QueryParam("units") String units, // metric, standard, imperial
                                      @QueryParam("appid") String appId);

}
