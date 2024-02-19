import { useEffect, useState } from "react";
import { PermissionType } from "../types/permission";
import { PermissionAPI } from "../api/permissions";

export const usePermissionTypes = () => {
    const [permissionTypes, setTypes] = useState<PermissionType[]>([]);

    useEffect(() => {
        PermissionAPI.getPermissionTypes().then(response => setTypes(response.permissionTypes));
    }, []);

    return permissionTypes;
};
