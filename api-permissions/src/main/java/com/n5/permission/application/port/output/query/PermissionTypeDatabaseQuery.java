package com.n5.permission.application.port.output.query;

import com.n5.permission.domain.model.database.PermissionType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PermissionTypeDatabaseQuery extends JpaRepository<PermissionType, Integer> {
}
