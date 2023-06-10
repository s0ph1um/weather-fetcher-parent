package com.wfproject.stats.repository;

import com.wfproject.stats.entity.RequestData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RequestStatsRepository extends JpaRepository<RequestData, Long> {

}
