package com.n5.permission.infrastructure.mapper;

import org.dozer.*;

import org.springframework.stereotype.Component;

import java.util.Collections;

@Component
public class MapperServiceDozerImpl implements MapperService {

    DozerBeanMapper mapper = new DozerBeanMapper();
    @Override
    public <T> T map(Object o, Class<T> tClass) {
        return mapper.map(o, tClass);
    }
}
