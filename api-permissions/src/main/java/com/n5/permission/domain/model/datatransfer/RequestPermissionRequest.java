package com.n5.permission.domain.model.datatransfer;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.Date;

@Data
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class RequestPermissionRequest {
    private Integer permissionId;
    private String nombreEmpleado;
    private String apellidoEmpleado;
    private String tipoPermiso;
    private Date fechaPermiso;
}