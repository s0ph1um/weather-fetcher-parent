package com.wfproject.stats.service;

import com.wfproject.stats.entity.RequestData;
import org.springframework.data.domain.Page;


public interface RequestStatsService {

    Page<RequestData> getRequests(Integer page, Integer size, String sortBy, String order);

    boolean delete(Long id);

}
