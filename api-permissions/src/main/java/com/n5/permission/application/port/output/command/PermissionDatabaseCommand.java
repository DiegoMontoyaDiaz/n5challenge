package com.n5.permission.application.port.output.command;

import com.n5.permission.domain.model.database.Permission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;


@Repository
public interface PermissionDatabaseCommand extends JpaRepository<Permission, Integer> {

    @Modifying
    @Query("update Permission p set p.tipoPermiso = :tipoPermiso where p.permissionId = :permissionId")
    void modifyPermission(Integer permissionId, Integer tipoPermiso);

}
