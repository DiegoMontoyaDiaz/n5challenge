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
public class RequestPermissionResponse {
    @JsonProperty("permissionId")
    @Mapping("permissionId")
    private String whateverValue;
}