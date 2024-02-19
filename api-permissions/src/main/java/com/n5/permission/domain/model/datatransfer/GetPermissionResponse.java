package com.n5.permission.domain.model.datatransfer;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.dozer.Mapping;

import java.util.Date;

@Data
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class GetPermissionResponse {
    private Integer permissionId;
    private String nombreEmpleado;
    private String apellidoEmpleado;
    private String tipoPermiso;
    private Date fechaPermiso;
}