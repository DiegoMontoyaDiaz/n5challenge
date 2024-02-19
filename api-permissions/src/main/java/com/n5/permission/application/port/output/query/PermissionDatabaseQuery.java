package com.n5.permission.application.port.output.query;

import com.n5.permission.domain.model.database.Permission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface PermissionDatabaseQuery extends JpaRepository<Permission, Integer> {

    Optional<Permission> findByPermissionId(Integer permissionId);


}
