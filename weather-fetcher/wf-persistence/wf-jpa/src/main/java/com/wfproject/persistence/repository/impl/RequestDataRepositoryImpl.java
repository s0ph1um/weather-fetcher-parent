package com.wfproject.persistence.repository.impl;

import com.wfproject.persistence.entity.RequestData;
import com.wfproject.persistence.repository.RequestDataRepository;
import lombok.Setter;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

@Transactional
public class RequestDataRepositoryImpl implements RequestDataRepository {

    private final String PERSISTENCE_UNIT_NAME = "request-stats-mariadb";

    @PersistenceContext(unitName = PERSISTENCE_UNIT_NAME)
    private EntityManager entityManager;

    @Override
    public void save(RequestData requestData) {
        System.out.println("SAVING REQUEST: " + requestData);
        entityManager.persist(requestData);
    }
}
