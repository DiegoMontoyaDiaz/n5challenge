package com.n5.permission.domain.model.datatransfer;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;

@Data
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class GetPermissionTypesResponse {
    @JsonProperty("permissionTypes")
    private List<PermissionType> permissions;
}