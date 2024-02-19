
import { BACKEND_URL } from "../constants";
import { Permission, PermissionTypesResponse, RequestPermissionResponse } from "../types/permission";
import Request from "./base";


async function getPermissionTypes(): Promise<PermissionTypesResponse> {
    return Request.get(`${BACKEND_URL}/api-permissions/v1/types`)
        .then(response => response.data);
}

async function getPermissions(): Promise<Permission[]> {
    return Request.get(`${BACKEND_URL}/api-permissions/v1/`)
        .then(response => response.data);
}

async function getPermission(id: number): Promise<Permission> {
    return Request.get(`${BACKEND_URL}/api-permissions/v1/${id}`)
        .then(response => response.data);
}

async function updatePermission(id: number, permissionType: string): Promise<Permission> {
    return Request.patch(`${BACKEND_URL}/api-permissions/v1/${id}`, { tipoPermiso: permissionType })
        .then(response => response.data);
}

async function requestPermission(payload: Permission): Promise<RequestPermissionResponse> {
    const data = {
        nombreEmpleado: payload.nombreEmpleado,
        apellidoEmpleado: payload.apellidoEmpleado,
        tipoPermiso: payload.tipoPermiso,
        fechaPermiso: payload.fechaPermiso
    };
    return Request.post(`${BACKEND_URL}/api-permissions/v1/`, data)
        .then(response => response.data);
}

export const PermissionAPI = {
    getPermissionTypes,
    getPermissions,
    getPermission,
    requestPermission,
    updatePermission
};
