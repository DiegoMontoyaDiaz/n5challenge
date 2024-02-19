
export interface PermissionTypesResponse {
    permissionTypes: PermissionType[]
}

export interface PermissionType {
    generatedId: string;
    permissionTypeDescription: string;
}

export interface Permission {
    permissionId: number;
    nombreEmpleado: string;
    apellidoEmpleado: string;
    tipoPermiso: string;
    fechaPermiso: string;
}

export interface RequestPermissionResponse {
    generatedId: string
}
