package com.wfproject.api;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.io.IOException;

@Path("/")
public interface WeatherService {

    @Produces(MediaType.APPLICATION_JSON)
    @GET
    @Path("/currentWeather")
    WeatherResponse getCurrentWeather(@QueryParam("country") String countryCode,
                                      @QueryParam("city") String city,
                                      @QueryParam("units") String units) throws IOException;

}
