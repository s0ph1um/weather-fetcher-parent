package com.wfproject.persistence.entity;

import lombok.*;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "request_data")
@AllArgsConstructor
@Data
@NoArgsConstructor
public class RequestData {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String city;
    @Column(name = "country_code")
    private String countryCode;
    private Timestamp date;
    private int code;
    private String message;
    @Column(name = "is_successful")
    private boolean isSuccessful;

}
