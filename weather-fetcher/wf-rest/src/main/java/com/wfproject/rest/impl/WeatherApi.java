package com.wfproject.rest.impl;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

@Path("/data/2.5")
public interface WeatherApi {

    @Produces(MediaType.APPLICATION_JSON)
    @GET
    @Path("/weather")
    String getCurrentWeather(@QueryParam("q") String locationQuery,
                                      @QueryParam("units") String units,
                                      @QueryParam("appid") String appId);

}
