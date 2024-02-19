package com.n5.permission.domain.usecase;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.n5.permission.application.port.output.query.PermissionDatabaseQuery;
import com.n5.permission.application.port.output.query.PermissionTypeDatabaseQuery;
import com.n5.permission.domain.model.database.Permission;
import com.n5.permission.domain.model.database.PermissionType;
import com.n5.permission.domain.model.datatransfer.GetPermissionResponse;
import com.n5.permission.domain.model.datatransfer.GetPermissionTypesResponse;
import com.n5.permission.domain.model.datatransfer.ModifyPermissionRequest;
import com.n5.permission.infrastructure.config.Constants;
import com.n5.permission.infrastructure.mapper.MapperService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class QueryUseCase {

    @Autowired
    MapperService mapperService;

    @Autowired
    PermissionTypeDatabaseQuery permissionTypeDatabaseQuery;

    @Autowired
    PermissionDatabaseQuery permissionDatabaseQuery;

    @Value("${user.admin}")
    private String userSystemAdmin;

    public QueryUseCase(){};

    public GetPermissionTypesResponse getPermissionTypes() throws JsonProcessingException {
        System.out.println("Starting method QueryUseCase.getPermissionTypes()");
        return returnAllPermissionTypes();
    }

    public List<GetPermissionResponse> getAll() {
        System.out.println("Starting method QueryUseCase.getAll()");
        List<Permission> permissionList = permissionDatabaseQuery.findAll();
        List<GetPermissionResponse> responseList = new ArrayList<>();
        for(Permission permission : permissionList){
           responseList.add(mapperService.map(permission, GetPermissionResponse.class));
        }
        return responseList;
    }
    private GetPermissionTypesResponse returnAllPermissionTypes() {
        List<PermissionType> permissionList = permissionTypeDatabaseQuery.findAll();
        List<com.n5.permission.domain.model.datatransfer.PermissionType> returnedList = new ArrayList<>();
        for(PermissionType permission: permissionList){
            returnedList.add(mapperService.map(permission,com.n5.permission.domain.model.datatransfer.PermissionType.class));
        }
        return new GetPermissionTypesResponse(returnedList);
    }


    private Map<String, Object> getClaims (String role){
        Map<String, Object> claims = new HashMap<>();
        claims.put("role", role);
        if(role.equals(Constants.ROLE_ADMIN))
            claims.put("permissions", Arrays.asList("accountsCreation", "accountGetBalance","transactionsPayment"));
        else
            claims.put("permissions", Arrays.asList("accountGetBalance"));
        return claims;
    }


    /**
     *
     * @param username
     * @return User role
     * For this example, the user is hardcoded in boostrap.yml and
     * we're assigning a ADMIN or USER role as a output of a simple comparison
     */
    private String validateUsername(String username) {
        if (username != null) {
            return userSystemAdmin.equalsIgnoreCase(username) ? Constants.ROLE_ADMIN : Constants.ROLE_USER;
        } else {
            throw new RuntimeException("Username does not exit in configuration");
        }
    }
}
