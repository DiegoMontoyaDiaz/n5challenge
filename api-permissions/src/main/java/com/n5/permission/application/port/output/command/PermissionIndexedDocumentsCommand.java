package com.n5.permission.application.port.output.command;

import com.n5.permission.domain.model.document.PermissionDocument;

public interface PermissionIndexedDocumentsCommand {
    public void save(PermissionDocument permissionDocument) throws Exception;
}
