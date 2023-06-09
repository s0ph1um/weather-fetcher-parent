package com.wfproject.api;

import javax.ws.rs.DefaultValue;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import java.io.IOException;

@Path("/")
public interface WeatherService {

    @Produces(MediaType.APPLICATION_JSON)
    @GET
    @Path("/currentWeather")
    WeatherResponseDto getCurrentWeather(@DefaultValue(value = "") @QueryParam("country") String countryCode,
                                         @DefaultValue(value = "") @QueryParam("city") String city) throws IOException;

}
