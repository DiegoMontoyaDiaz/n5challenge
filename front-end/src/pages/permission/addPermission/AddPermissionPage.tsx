import { Button, Paper, Stack } from "@mui/material";
import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { PermissionForm } from "../components/PermissionForm";
import { PermissionAPI } from "../../../api/permissions";
import { Permission } from "../../../types/permission";
import BackIcon from "@mui/icons-material/ArrowLeft";

export const AddPermissionPage: React.FC<any> = () => {

    const navigate = useNavigate();

    const onSave = useCallback(async (params: any) => {
        let payload = params as Permission;
        payload.fechaPermiso = new Date().toISOString();

        if (payload.nombreEmpleado.trim().length > 0
            && payload.apellidoEmpleado.trim().length > 0
            && payload.tipoPermiso.trim().length > 0) {

            PermissionAPI.requestPermission(payload)
                .then(() => navigate("/permissions"));
        }

    }, [navigate]);

    return (
        <Stack direction={"column"}>
            <Stack direction="row" >
                <Button onClick={() => navigate(-1)} aria-label="back-btn" sx={{  }} startIcon={<BackIcon />}>Regresar</Button>
            </Stack>
            <Paper sx={{ p: 2, mt: 1, display: 'flex', flexDirection: 'column' }}>
                <PermissionForm formTitle="Agregar permiso" onSave={onSave} />
            </Paper>
        </Stack>
    );
};
