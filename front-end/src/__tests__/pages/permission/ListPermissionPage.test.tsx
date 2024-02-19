
import { fireEvent, render, screen } from "@testing-library/react";
import { useNavigate } from "react-router-dom";
import { permissionTypesResponse, permissions } from "../../../__fixtures__/fixtures";
import { ListPermissionPage } from "../../../pages/permission/listPermission/ListPermissionPage";

jest.mock("../../../api/permissions", () => {
    return {
        PermissionAPI: {
            getPermissionTypes: jest.fn(),
            getPermissions: jest.fn()
        }
    }
});

jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn(),
}));

const useNavigateMock = jest.mocked(useNavigate);

import { PermissionAPI } from "../../../api/permissions";


describe("<ListPermissionPage />", () => {

    it("loads", async () => {
        (PermissionAPI.getPermissionTypes as any).mockImplementation(() => Promise.resolve(permissionTypesResponse));
        (PermissionAPI.getPermissions as any).mockImplementation(() => Promise.resolve(permissions));

        const navigateMock = jest.fn();
        useNavigateMock.mockReturnValue(navigateMock);

        render(<ListPermissionPage />);

        expect(await screen.findByText("Permisos")).toBeInTheDocument();
        expect(await screen.findByText(permissions[0].fechaPermiso)).toBeInTheDocument();
        expect(await screen.findByText("write")).toBeInTheDocument();
    });

    it("mange events", async () => {
        (PermissionAPI.getPermissionTypes as any).mockImplementation(() => Promise.resolve(permissionTypesResponse));
        (PermissionAPI.getPermissions as any).mockImplementation(() => Promise.resolve(permissions));

        const navigateMock = jest.fn();
        useNavigateMock.mockReturnValue(navigateMock);

        render(<ListPermissionPage />);

        expect(await screen.findByText("Permisos")).toBeInTheDocument();

        fireEvent.click(screen.getByRole("button", { name: "add-btn" }));

        expect(navigateMock).toHaveBeenCalledWith("add");

        navigateMock.mockClear();

        const id = permissions[0].permissionId;
        
        fireEvent.click(await screen.findByRole("button", { name: "edit-btn-" + id }));

        expect(navigateMock).toHaveBeenCalledWith("modify/" + id);
    });

});