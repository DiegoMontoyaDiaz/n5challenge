package com.n5.permission.application.port.input;

import com.n5.permission.domain.model.datatransfer.GetPermissionTypesResponse;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api-permissions/v1/")
public interface PermissionTypesInputPort {

  /**
   * Return a list of all permission types
   * @return
   */
  @GetMapping("/types")
  GetPermissionTypesResponse getPermissionTypes();

}
