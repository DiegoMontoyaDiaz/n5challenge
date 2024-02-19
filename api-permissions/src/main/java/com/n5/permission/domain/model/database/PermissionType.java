package com.n5.permission.domain.model.database;


import jakarta.persistence.*;
import lombok.Data;
import lombok.ToString;
import org.apache.commons.lang3.NotImplementedException;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Data
@ToString
@Entity
@Table(name = "permission_type")
public class PermissionType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer permissionTypeId;

    @Column(name = "descripcion")
    private String descripcion;

}