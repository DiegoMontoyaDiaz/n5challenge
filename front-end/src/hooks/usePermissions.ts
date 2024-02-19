import { useEffect, useState } from "react";
import { Permission } from "../types/permission";
import { PermissionAPI } from "../api/permissions";

export const usePermissions = () => {
    const [permissions, setPermissions] = useState<Permission[]>([]);

    useEffect(() => {
        PermissionAPI.getPermissions().then(response => setPermissions(response));
    }, []);

    return permissions;
};
