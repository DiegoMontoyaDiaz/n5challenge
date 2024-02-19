package com.n5.login.domain.model.authorization;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@ToString
@NoArgsConstructor
public class Authorization {
    private String token;
    public Authorization(String JWT) {
        this.token=JWT;
    }

    //TODO: Put JWT validation expiration logic
}