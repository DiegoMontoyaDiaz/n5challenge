package com.n5.permission.infrastructure.adapter.input;

import com.amazonaws.services.dynamodbv2.model.InternalServerErrorException;
import com.n5.permission.application.port.input.PermissionsInputPort;
import com.n5.permission.domain.model.datatransfer.GetPermissionResponse;
import com.n5.permission.domain.model.datatransfer.ModifyPermissionRequest;
import com.n5.permission.domain.model.datatransfer.RequestPermissionRequest;
import com.n5.permission.domain.model.datatransfer.RequestPermissionResponse;
import com.n5.permission.domain.model.event.EventTypesEnum;
import com.n5.permission.domain.usecase.CommandUseCase;
import com.n5.permission.domain.usecase.QueryUseCase;
import com.n5.permission.infrastructure.util.BaseController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class PermissionsInputPortHttpAdapter extends BaseController implements PermissionsInputPort {

  @Autowired
  private CommandUseCase commandUseCase;

  @Autowired
  private QueryUseCase queryUseCase;

  //Command
  @Override
  public ResponseEntity<RequestPermissionResponse> requestPermissions(RequestPermissionRequest request) throws Exception {
    try {
      //Primero ejecutar el UOW
      RequestPermissionResponse requestPermissionResponse = commandUseCase.requestPermission(request);
      //Si no hay alguna excepción, recién mandar el evento.
      commandUseCase.sendPermissionEvent(EventTypesEnum.REQUEST);
      return buildResponseEntity(requestPermissionResponse, HttpStatus.CREATED);
    } catch (Exception e){
      e.printStackTrace();
      return buildResponseEntity(null, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  //Query
  @Override
  public ResponseEntity<List<GetPermissionResponse>> getPermissions() throws Exception {
    try {
      List<GetPermissionResponse> listPermissionResponse = queryUseCase.getAll();
      commandUseCase.sendPermissionEvent(EventTypesEnum.GET);
      if(!listPermissionResponse.isEmpty()){
        return buildResponseEntity(listPermissionResponse, HttpStatus.OK);
      } else {
        return buildResponseEntity(null, HttpStatus.NOT_FOUND);
      }
     } catch (Exception e) {
      e.printStackTrace();
      return buildResponseEntity(null, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  //Command
  @Override
  public ResponseEntity<Void> modifyPermissions(Integer id, ModifyPermissionRequest request) throws Exception {
     try {
       commandUseCase.modifyPermission(id, request);
       commandUseCase.sendPermissionEvent(EventTypesEnum.MODIFY);
       return  ResponseEntity.noContent().build();
     } catch (Exception e){
       throw new InternalServerErrorException( "Ocurrió un error en PermissionsInputPortHttpAdapter.modifyPermissions");
     }
  }

  private <T> ResponseEntity<T> buildResponseEntity(T object, HttpStatus status) {
      return new ResponseEntity<>(object, status);
  }
}
