
export const loginResponse = {
    token: "Bearer abc-123"
};

export const permission = {
    permissionId: 1,
    nombreEmpleado: "name",
    apellidoEmpleado: "lastname",
    tipoPermiso: "1",
    fechaPermiso: "2024-02-17"
};

export const permissions = [permission];

export const permissionTypesResponse = {
    permissionTypes: [
        {
            generatedId: "1",
            permissionTypeDescription: "write"
        },
        {
            generatedId: "2",
            permissionTypeDescription: "read"
        }
    ]
}


export const permissionCreated = {
    generatedId: "10"
};
