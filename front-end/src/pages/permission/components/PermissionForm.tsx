import { Box, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, TextField } from "@mui/material";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Permission, PermissionType } from "../../../types/permission";
import { usePermissionTypes } from "../../../hooks/usePermissionTypes";
import { Title } from "../../../components/title";

interface PermissionData {
    permissionId?: number;
    nombreEmpleado: string;
    apellidoEmpleado: string;
    tipoPermiso: string;
    fechaPermiso: string;
}

interface FormProps {
    formTitle: string,
    permission?: Permission,
    onSave: (data: PermissionData) => Promise<void>
}


export const PermissionForm: React.FC<FormProps> = (props) => {
    const permissionTypes: PermissionType[] = usePermissionTypes();
    const isUpdateOperation = props.permission != null;

    const [permissionData, setPermissionToSave] = useState<PermissionData>({
        permissionId: props.permission?.permissionId,
        nombreEmpleado: props.permission?.nombreEmpleado ?? "",
        apellidoEmpleado: props.permission?.apellidoEmpleado ?? "",
        tipoPermiso: "",
        fechaPermiso: props.permission?.fechaPermiso ?? "",
    });

    useEffect(() => {
        if (permissionTypes.length > 0 && props.permission != null) {
            setPermissionToSave(({ tipoPermiso, ...params }) => {
                return {
                    tipoPermiso: props.permission?.tipoPermiso!!,
                    ...params
                };
            });
        }
    }, [permissionTypes, props.permission]);

    const createPermission = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        props.onSave(permissionData);
    };

    const onChangePermissionType = (event: SelectChangeEvent) => {
        const value = event.target.value as string;
        const selected = permissionTypes.find(permission => permission.generatedId === value);
        if (selected != null) {
            setPermissionToSave(({ tipoPermiso, ...params }) => {
                return {
                    tipoPermiso: selected.generatedId,
                    ...params
                };
            });
        }
    };

    const onChangeName = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value as string;
        setPermissionToSave(({ nombreEmpleado, ...params }) => {
            return {
                nombreEmpleado: value,
                ...params
            };
        });
    };

    const onChangeLastName = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value as string;
        setPermissionToSave(({ apellidoEmpleado, ...params }) => {
            return {
                apellidoEmpleado: value,
                ...params
            };
        });
    };

    return (
        <>
            <Title> {props.formTitle} </Title>
            <Box
                component="form"
                noValidate
                autoComplete="off"
                onSubmit={createPermission}
            >
                <Stack direction={"column"} spacing={2}>
                    <TextField label="Nombre" variant="outlined" value={permissionData.nombreEmpleado} onChange={onChangeName} disabled={isUpdateOperation} aria-label="name-input" />
                    <TextField label="Apellido" variant="outlined" value={permissionData.apellidoEmpleado} onChange={onChangeLastName} disabled={isUpdateOperation} aria-label="lastname-input" />
                    <FormControl fullWidth>
                        <InputLabel id="select-label"
                            aria-label="type-input">Tipo</InputLabel>
                        <Select
                            labelId="select-label"
                            id="simple-select"
                            value={permissionData.tipoPermiso}
                            label="Tipo"
                            onChange={onChangePermissionType}
                        >
                            {permissionTypes.map(permission => (
                                <MenuItem key={permission.generatedId}
                                    value={permission.generatedId}>{permission.permissionTypeDescription}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Button type="submit" variant="outlined" aria-label="save-btn">
                        Guardar
                    </Button>
                </Stack>
            </Box>
        </>
    );
};
