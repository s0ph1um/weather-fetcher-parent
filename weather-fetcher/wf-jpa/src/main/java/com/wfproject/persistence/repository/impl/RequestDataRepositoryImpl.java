package com.wfproject.persistence.repository.impl;

import com.wfproject.persistence.entity.RequestData;
import com.wfproject.persistence.repository.RequestDataRepository;
import lombok.Setter;

import javax.persistence.*;

//@Transactional
public class RequestDataRepositoryImpl implements RequestDataRepository {

    private final String PERSISTENCE_UNIT_NAME = "request-stats-mariadb";

//    @Setter
//    @PersistenceContext(unitName = PERSISTENCE_UNIT_NAME)
//    private EntityManager entityManager;

    @Setter
    @PersistenceUnit(unitName=PERSISTENCE_UNIT_NAME)
    private EntityManagerFactory factory;


    @Override
    public void save(RequestData requestData) {
        System.out.println("SAVING REQUEST: " + requestData);
        EntityManager entityManager = factory.createEntityManager();
        EntityTransaction entityTransaction = entityManager.getTransaction();
        entityTransaction.begin();
        entityManager.persist(requestData);
        entityTransaction.commit();
    }
}
