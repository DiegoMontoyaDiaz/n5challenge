package com.n5.permission.domain.usecase;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.n5.permission.application.port.output.command.PermissionEventCommand;
import com.n5.permission.application.port.output.command.PermissionDatabaseCommand;
import com.n5.permission.application.port.output.command.PermissionIndexedDocumentsCommand;
import com.n5.permission.domain.model.database.Permission;
import com.n5.permission.domain.model.datatransfer.ModifyPermissionRequest;
import com.n5.permission.domain.model.datatransfer.RequestPermissionRequest;
import com.n5.permission.domain.model.datatransfer.RequestPermissionResponse;
import com.n5.permission.domain.model.document.PermissionDocument;
import com.n5.permission.domain.model.event.EventTypesEnum;
import com.n5.permission.infrastructure.config.Constants;
import com.n5.permission.infrastructure.mapper.MapperService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class CommandUseCase {

    @Autowired
    MapperService mapperService;

    @Autowired
    PermissionDatabaseCommand permissionDataBaseCommand;
    @Autowired
    PermissionEventCommand permissionEventCommand;
    @Autowired
    PermissionIndexedDocumentsCommand permissionIndexedDocumentsCommand;

    public CommandUseCase(){};

    @Transactional
    public RequestPermissionResponse requestPermission(RequestPermissionRequest request) throws Exception {
        System.out.println("Starting method CommandUseCase.requestPermission for permission: " +
                ""+ request.getNombreEmpleado()+" /n " +
                ""+ request.getApellidoEmpleado()+" /n " +
                ""+ request.getTipoPermiso()+" /n " +
                ""+ request.getFechaPermiso());

        Permission permission = mapperService.map(request, Permission.class);
        PermissionDocument permissionDocument = mapperService.map(permission, PermissionDocument.class);

        /**
         * The Unit of Work pattern guarantee that all transactions work as a single unit.
         * If one transaction fails, all fails and if all succeed, al the block does it too.
         * Spring handles it automatically with "@Transactional" annotation, you dont have
         * to worry about it.
         */
        permissionDataBaseCommand.save(permission);
        System.out.println("permissionDataBaseCommand.save(permission) executed successfully");
        permissionIndexedDocumentsCommand.save(permissionDocument);
        System.out.println("permissionIndexedDocumentsCommand.save(permissionDocument) executed successfully");
        return mapperService.map(permission, RequestPermissionResponse.class);
    }

    public void sendPermissionEvent(EventTypesEnum eventType) throws JsonProcessingException {
        permissionEventCommand.publishEvent(eventType);
        System.out.println("permissionEventCommand.publishEvent("+eventType.toString()+") executed successfully");

    }

    @Transactional
    public void modifyPermission(Integer id, ModifyPermissionRequest request) {
        System.out.println("Starting method QueryUseCase.modifyPermission for id: "+id +" and tipoPermiso: "+request.getTipoPermiso());
        permissionDataBaseCommand.modifyPermission(id, Integer.parseInt(request.getTipoPermiso()));
        System.out.println("Method QueryUseCase.modifyPermission executed successfully");
    }
}
