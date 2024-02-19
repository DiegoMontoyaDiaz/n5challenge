package com.n5.permission.domain.model.datatransfer;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.dozer.Mapping;

@Data
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class PermissionType {
    @JsonProperty("generatedId")
    @Mapping("permissionTypeId")
    private String permissionTypeId;

    @JsonProperty("permissionTypeDescription")
    @Mapping("descripcion")
    private String permissionTypeDescription;
}