package com.n5.permission.domain.model.document;

import lombok.Data;
import org.springframework.data.annotation.Id;
//import org.springframework.data.elasticsearch.annotations.Document;

import java.util.Date;

@Data
//@Document(indexName = "permisos", createIndex = false)
public class PermissionDocument {

    @Id
    private Integer permissionId;
    private String nombreEmpleado;
    private String apellidoEmpleado;
    private Integer tipoPermiso;
    private Date fechaPermiso;

}