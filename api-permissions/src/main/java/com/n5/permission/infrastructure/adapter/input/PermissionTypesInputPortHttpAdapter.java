package com.n5.permission.infrastructure.adapter.input;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.n5.permission.application.port.input.PermissionTypesInputPort;
import com.n5.permission.domain.model.datatransfer.GetPermissionTypesResponse;
import com.n5.permission.domain.usecase.QueryUseCase;
import com.n5.permission.infrastructure.util.BaseController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PermissionTypesInputPortHttpAdapter extends BaseController implements PermissionTypesInputPort {


  @Autowired
  private QueryUseCase queryUseCase;

  //Query
  @Override
  public GetPermissionTypesResponse getPermissionTypes() {
    try {
      return queryUseCase.getPermissionTypes();
    } catch (JsonProcessingException e) {
      throw new RuntimeException(e);
    }
  }


}
