package com.n5.login.application.port.input;

import com.n5.login.domain.model.authorization.Authorization;
import com.n5.login.domain.model.datatransfer.UserRequest;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api-login/v1/")
public interface AuthorizationInputPort {


  @PostMapping("/userAuthentication")
  Authorization authorize(@RequestBody final UserRequest request);

}
