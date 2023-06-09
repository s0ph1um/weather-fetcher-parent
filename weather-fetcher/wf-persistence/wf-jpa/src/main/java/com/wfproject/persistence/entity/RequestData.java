package com.wfproject.persistence.entity;

import lombok.Builder;
import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "request_data")
@Data
@Builder
public class RequestData {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String city;
    @Column(name = "country_code")
    private String countryCode;
    private long date;
    private int code;
    private String message;
    @Column(name = "is_successful")
    private boolean isSuccessful;
}
