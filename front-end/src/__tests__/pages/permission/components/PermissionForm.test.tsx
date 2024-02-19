import { fireEvent, render, screen } from "@testing-library/react";
import { PermissionForm } from "../../../../pages/permission/components/PermissionForm";
import { permission, permissionTypesResponse } from "../../../../__fixtures__/fixtures";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";

jest.mock("../../../../api/permissions", () => {
    return {
        PermissionAPI: {
            getPermissionTypes: jest.fn()
        }
    }
});

import { PermissionAPI } from "../../../../api/permissions";


describe("<PermissionForm />", () => {

    it("loads form", async () => {
        (PermissionAPI.getPermissionTypes as any).mockImplementation(() => Promise.resolve(permissionTypesResponse));
        const mockGetPermissionTypes = jest.spyOn(PermissionAPI, "getPermissionTypes");

        render(<PermissionForm formTitle="Crear permiso" onSave={async () => { }} />);

        expect(mockGetPermissionTypes).toHaveBeenCalled();

        expect(await screen.findByLabelText("name-input")).toBeInTheDocument();
        expect(await screen.findByLabelText("lastname-input")).toBeInTheDocument();
        expect(await screen.findByRole("button", { name: "save-btn" })).toBeInTheDocument();
        expect(await screen.findByRole("combobox", { name: "type-input" })).toBeInTheDocument();
    });


    it("manage inputs", async () => {
        (PermissionAPI.getPermissionTypes as any).mockImplementation(() => Promise.resolve(permissionTypesResponse));
        const onSave = jest.fn();

        render(<PermissionForm formTitle="Crear permiso" onSave={onSave} />);

        fireEvent.change(await screen.findByLabelText("Nombre"), { target: { value: "random" } });
        fireEvent.change(await screen.findByLabelText("Apellido"), { target: { value: "person" } });

        await act(async () => {
            userEvent.click(await screen.findByRole("combobox", { name: "type-input" }));
        });

        fireEvent.click(await screen.findByRole("option", { name: "write" }));
        fireEvent.click(screen.getByRole("button", { name: "save-btn" }));

        expect(onSave).toHaveBeenLastCalledWith({
            permissionId: undefined,
            nombreEmpleado: "random",
            apellidoEmpleado: "person",
            tipoPermiso: "1",
            fechaPermiso: ""
        });
        expect(onSave).toHaveBeenCalledTimes(1);
    });

    it("shows disabled inputs when permission is not null", async () => {
        (PermissionAPI.getPermissionTypes as any).mockImplementation(() => Promise.resolve(permissionTypesResponse));
        const onSave = jest.fn();

        render(<PermissionForm formTitle="Crear permiso" onSave={onSave} permission={permission} />);

        expect(await screen.findByLabelText("Nombre")).toHaveProperty("disabled", true);
        expect(await screen.findByLabelText("Apellido")).toHaveProperty("disabled", true);

        await act(async () => {
            userEvent.click(await screen.findByRole("combobox", { name: "type-input" }));
        });

        fireEvent.click(await screen.findByRole("option", { name: "read" }));
        fireEvent.click(screen.getByRole("button", { name: "save-btn" }));

        expect(onSave).toHaveBeenLastCalledWith({
            permissionId: permission.permissionId,
            nombreEmpleado: permission.nombreEmpleado,
            apellidoEmpleado: permission.apellidoEmpleado,
            tipoPermiso: "2",
            fechaPermiso: permission.fechaPermiso
        });
        expect(onSave).toHaveBeenCalledTimes(1);
    });
});
