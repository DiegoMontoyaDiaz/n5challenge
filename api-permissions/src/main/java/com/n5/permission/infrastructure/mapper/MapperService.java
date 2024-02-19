package com.n5.permission.infrastructure.mapper;

public interface MapperService {
    <T> T map(Object o, Class<T> tClass);
}
