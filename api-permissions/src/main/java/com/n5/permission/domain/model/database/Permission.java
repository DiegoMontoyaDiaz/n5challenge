package com.n5.permission.domain.model.database;


import jakarta.persistence.*;
import lombok.*;
import org.apache.commons.lang3.NotImplementedException;
import org.dozer.Mapping;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Data
@ToString
@Entity
@Table(name = "permissions")
public class Permission {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer permissionId;

    @Column(name = "nombreempleado")
    private String nombreEmpleado;

    @Column(name = "apellidoempleado")
    private String apellidoEmpleado;

    @Column(name = "tipopermiso")
    private Integer tipoPermiso;

    @DateTimeFormat(pattern = "dd/MM/yyyy")
    @Column(name = "fechapermiso")
    private Date fechaPermiso;

    /**
     * En los modelos de Clean Architecture, las reglas de negocio
     * están dentro de las entidades. En caso se necesite hacer alguna
     * lógica cross a toda la aplicación referente a los permisos,
     * iría aqui.
     * @param permission
     */
    public void validateSomeTypeOfBussinessRule(Permission permission) {
        throw new NotImplementedException("Not implemented");
    }

}