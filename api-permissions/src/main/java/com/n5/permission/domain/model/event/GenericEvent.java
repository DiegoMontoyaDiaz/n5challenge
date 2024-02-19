package com.n5.permission.domain.model.event;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GenericEvent implements Serializable {

    private String UUID;
    private String eventType;
}
