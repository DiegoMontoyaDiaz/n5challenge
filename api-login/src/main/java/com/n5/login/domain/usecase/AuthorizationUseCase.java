package com.n5.login.domain.usecase;

import com.n5.login.domain.model.authorization.Authorization;
import com.n5.login.infrastructure.config.Constants;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.util.*;
import java.util.stream.Collectors;

@Component
public class AuthorizationUseCase {

    @Value("${user.admin}")
    private String userSystemAdmin;

    public AuthorizationUseCase(){};


    /**
     * authorize
     *
     * @param userName  Object configsType
     * @return A JWT object with the authorization
     */
    public Authorization authorize(String userName){
        System.out.println("Starting method UserController.getJWTToken for username :" + userName);
        final String role = validateUsername(userName);

        String secretKey = "mySecretKey";
        final List<GrantedAuthority> grantedAuthorities = AuthorityUtils.commaSeparatedStringToAuthorityList(role);
        final String token = "Bearer " +
                Jwts.builder()
                        .setId(UUID.randomUUID().toString())
                        .setSubject(userName)
                        .claim(
                                "authorities",
                                grantedAuthorities.stream()
                                        .map(GrantedAuthority::getAuthority)
                                        .collect(Collectors.toList()))
                        .setIssuedAt(new Date(System.currentTimeMillis()))
                        .setExpiration(new Date(System.currentTimeMillis() + (600000)))
                        .addClaims(getClaims(role))
                        .signWith(SignatureAlgorithm.HS512, secretKey.getBytes(StandardCharsets.UTF_8))
                        .compact();
        System.out.println("Output of method UserController.getJWTToken for username :" + userName + "is: \n"+token);
        return new Authorization(token);
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
