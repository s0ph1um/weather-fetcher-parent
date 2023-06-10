package com.wfproject.rest.api;

import com.wfproject.rest.model.WeatherResponse;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
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
