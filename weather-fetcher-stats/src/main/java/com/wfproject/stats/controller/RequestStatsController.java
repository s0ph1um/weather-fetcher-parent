package com.wfproject.stats.controller;

import com.wfproject.stats.entity.RequestData;
import com.wfproject.stats.service.RequestStatsService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/request-stats")
public class RequestStatsController {

    private final RequestStatsService requestStatsService;

    @GetMapping("/list")
    public ResponseEntity<Page<RequestData>> getRequests(@RequestParam(defaultValue = "0",required = false) Integer page,
                                                         @RequestParam(defaultValue = "20", required = false) Integer size,
                                                         @RequestParam(defaultValue = "date", required = false) String sortBy,
                                                         @RequestParam(defaultValue = "desc", required = false) String order) {
        log.info("Fetching requests page: {}, size: {}, sortBy: {}", page, size, sortBy);
        Page<RequestData> allRequests = requestStatsService.getRequests(page, size, sortBy, order);
        return ResponseEntity.ok(allRequests);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity deleteCity(@PathVariable("id") Long id) {
        log.info("Deleting request by ID: {}", id);
        boolean deleteResult = requestStatsService.delete(id);
        return deleteResult
                ? ResponseEntity.noContent().build()
                : ResponseEntity.notFound().build();
    }

}
