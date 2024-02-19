import { Button, Paper, Stack } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PermissionForm } from "../components/PermissionForm";
import { PermissionAPI } from "../../../api/permissions";
import { Permission } from "../../../types/permission";
import BackIcon from "@mui/icons-material/ArrowLeft";

export const UpdatePermissionPage: React.FC<any> = () => {
    const { id } = useParams();
    const [permission, setPermission] = useState<Permission | null>(null);
    const [message, setMessage] = useState("Buscando el permiso.");
    const navigate = useNavigate();

    useEffect(() => {
        if (id != null) {
            PermissionAPI.getPermission(parseInt(id))
                .then(setPermission)
                .catch(() => setMessage("Sin resultado."));
        }

    }, [id]);

    const onSave = useCallback(async (params: any) => {
        const payload = params as Permission;

        PermissionAPI.updatePermission(payload.permissionId, payload.tipoPermiso)
            .then(() => navigate("/permissions"))
            .catch(() => {});
    }, [navigate]);

    return (
        <Stack direction={"column"}>
            <Stack direction="row" >
                <Button onClick={() => navigate(-1)} aria-label="back-btn" sx={{  }} startIcon={<BackIcon />}>Regresar</Button>
            </Stack>
            <Paper sx={{ p: 2, mt: 1, display: 'flex', flexDirection: 'column' }}>
                {permission &&
                    <PermissionForm formTitle="Actualizar permiso" onSave={onSave} permission={permission} />}
                {(permission == null) && <div>{message}</div>}
            </Paper>
        </Stack>
    );
};
