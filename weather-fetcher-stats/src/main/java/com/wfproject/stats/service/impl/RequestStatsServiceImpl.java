package com.wfproject.stats.service.impl;

import com.wfproject.stats.entity.RequestData;
import com.wfproject.stats.repository.RequestStatsRepository;
import com.wfproject.stats.service.RequestStatsService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class RequestStatsServiceImpl implements RequestStatsService {

    private final RequestStatsRepository requestStatsRepository;

    public Page<RequestData> getRequests(Integer page, Integer size, String sortBy, String order) {

        Sort sort = "desc".equals(order)
                ? Sort.by(sortBy).descending()
                : Sort.by(sortBy).ascending();

        return requestStatsRepository.findAll(PageRequest.of(page, size, sort));
    }

}