package com.n5.permission.application.port.input;

import com.n5.permission.domain.model.datatransfer.GetPermissionResponse;
import com.n5.permission.domain.model.datatransfer.ModifyPermissionRequest;
import com.n5.permission.domain.model.datatransfer.RequestPermissionRequest;
import com.n5.permission.domain.model.datatransfer.RequestPermissionResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api-permissions/v1/")
public interface PermissionsInputPort {

  @PostMapping("/")
  @ResponseStatus(value = HttpStatus.CREATED)
  ResponseEntity<RequestPermissionResponse> requestPermissions(@RequestBody final RequestPermissionRequest request) throws Exception;

/*
  @GetMapping("/{id}")
  @ResponseStatus(value = HttpStatus.OK)
  ResponseEntity<GetPermissionResponse> getPermissions(@PathVariable Integer id) throws Exception;
*/
  @GetMapping("/")
  @ResponseStatus(value = HttpStatus.OK)
  ResponseEntity<List<GetPermissionResponse>> getPermissions() throws Exception;

  @PatchMapping("/{id}")
  @ResponseStatus(value = HttpStatus.NO_CONTENT)
  ResponseEntity<Void> modifyPermissions(@PathVariable Integer id, @RequestBody final ModifyPermissionRequest request) throws Exception;

}
