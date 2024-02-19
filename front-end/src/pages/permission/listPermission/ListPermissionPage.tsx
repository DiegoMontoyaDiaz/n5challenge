import { Button, IconButton, Paper, Stack, Table, TableBody, TableCell, TableHead, TableRow, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import { usePermissions } from "../../../hooks/usePermissions";
import { Title } from "../../../components/title";
import { usePermissionTypes } from "../../../hooks/usePermissionTypes";
import { PermissionType } from "../../../types/permission";


function getPermissionTypeDescription(types: PermissionType[] | null, id: string) {
    const permissionType = types?.find(permissionType => permissionType.generatedId === id);
    return permissionType?.permissionTypeDescription ?? id;
}

export const ListPermissionPage: React.FC<any> = () => {

    const navigate = useNavigate();
    const permissions = usePermissions();
    const permissionTypes = usePermissionTypes();

    const editPermission = (id: number) => {
        navigate("modify/" + id);
    };

    const addPermission = () => {
        navigate("add");
    };

    return (
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <Title>Permisos</Title>
            <Stack direction="row-reverse" spacing={1}>
                <Tooltip title="Agregar permiso">
                    <Button variant="outlined" startIcon={<AddIcon />} onClick={addPermission} aria-label="add-btn">
                        Agregar
                    </Button>
                </Tooltip>
            </Stack>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Nombre</TableCell>
                        <TableCell>Apellido</TableCell>
                        <TableCell>Tipo</TableCell>
                        <TableCell>Fecha</TableCell>
                        <TableCell align="right">Opciones</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {permissions.map((row) => (
                        <TableRow key={row.permissionId}>
                            <TableCell>{row.nombreEmpleado}</TableCell>
                            <TableCell>{row.apellidoEmpleado}</TableCell>
                            <TableCell>{getPermissionTypeDescription(permissionTypes, row.tipoPermiso)}</TableCell>
                            <TableCell>{row.fechaPermiso}</TableCell>
                            <TableCell align="right">
                                <Tooltip title="Editar permiso">
                                    <IconButton aria-label={`edit-btn-${row.permissionId}`} onClick={() => editPermission(row.permissionId)}>
                                        <EditIcon />
                                    </IconButton>
                                </Tooltip>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    );
};
