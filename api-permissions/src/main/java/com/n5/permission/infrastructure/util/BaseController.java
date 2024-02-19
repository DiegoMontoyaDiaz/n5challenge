package com.n5.permission.infrastructure.util;

import com.n5.permission.infrastructure.config.Constants;
import org.springframework.beans.factory.annotation.Value;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

/**
 * La idea es que este BaseController mute a ser un emulador de authentication y authorization
 * server "local" y permitir al request acceder o no al controller.
 *
 * La idea es agregarlo como un aspecto a un decorador, si da el tiempo.
 */
public class BaseController {

    /**
     * De aquí se saca el nombre de usuario emitido por el API de Login
     * Se usará este usuario para hacer la comparación de acceso
     */
    @Value("${user.admin}")
    private String userSystemAdmin;

    /**
     * @param username
     * @return User role
     * La misma API podría emular el comportamiento de un authentication server "local", validando al usuario
     * proveniente del JWT, en caso el usuario sea el correcto, lo deja pasar.
     */
    private String validateUsername(String username) {
        if (username != null) {
            return userSystemAdmin.equalsIgnoreCase(username) ? Constants.ROLE_ADMIN : Constants.ROLE_USER;
        } else {
            throw new RuntimeException("Username does not exit in configuration");
        }
    }

    /**
     *
     * @param role
     * @return
     * Se está desarrollando una funcionalidad para que el microservicio pueda emular el comportamiento
     * de un authorization server "local" por JWT y que él mismo pueda autorizar sus peticiones en base a los
     * claims designados por el identity provider
     */
    private Map<String, Object> getClaims (String role){
        Map<String, Object> claims = new HashMap<>();
        claims.put("role", role);
        if(role.equals(Constants.ROLE_ADMIN))
            claims.put("permissions", Arrays.asList("getPermission", "modifyPermission","requestPermission"));
        else
            claims.put("permissions", Arrays.asList("null∫"));
        return claims;
    }
}
