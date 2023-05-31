package com.wfproject.api;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;

@Path("/")
public interface WeatherService {

    @Produces(MediaType.APPLICATION_JSON)
    @GET
    @Path("/currentWeather")
    String getCurrentWeather(@QueryParam("country") String countryCode,
                                      @QueryParam("city") String city,
                                      @QueryParam("units") String units);

}
