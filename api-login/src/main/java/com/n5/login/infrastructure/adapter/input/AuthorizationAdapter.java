package com.n5.login.infrastructure.adapter.input;

import com.n5.login.application.port.input.AuthorizationInputPort;
import com.n5.login.domain.model.authorization.Authorization;
import com.n5.login.domain.model.datatransfer.UserRequest;
import com.n5.login.domain.usecase.AuthorizationUseCase;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthorizationAdapter implements AuthorizationInputPort {


  @Autowired
  private AuthorizationUseCase authorizationUseCase;

  public Authorization authorize(UserRequest request) {
    return authorizationUseCase.authorize(request.getName());
  }


}
