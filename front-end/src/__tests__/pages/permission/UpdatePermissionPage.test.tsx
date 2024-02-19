import { act, fireEvent, render, screen } from "@testing-library/react";
import { UpdatePermissionPage } from "../../../pages/permission";
import { useNavigate, useParams } from "react-router-dom";
import { permission, permissionTypesResponse } from "../../../__fixtures__/fixtures";
import userEvent from "@testing-library/user-event";

jest.mock("../../../api/permissions", () => {
    return {
        PermissionAPI: {
            getPermissionTypes: jest.fn(),
            getPermission: jest.fn(),
            updatePermission: jest.fn()
        }
    }
});

jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn(),
    useParams: jest.fn()
}));

const useNavigateMock = jest.mocked(useNavigate);

import { PermissionAPI } from "../../../api/permissions";;

describe("<UpdatePermissionPage />", () => {

    it("loads", async () => {
        (PermissionAPI.getPermissionTypes as any).mockImplementation(() => Promise.resolve(permissionTypesResponse));
        (PermissionAPI.getPermission as any).mockImplementation(() => Promise.resolve(permission));

        (useNavigate as any).mockImplementation(() => {});
        (useParams as any).mockImplementation(() => ({id : "4"}));
        
        render(<UpdatePermissionPage />);

        expect(await screen.findByText("Actualizar permiso")).toBeInTheDocument();
    });


    it("saves data", async () => {
        (PermissionAPI.getPermissionTypes as any).mockImplementation(() => Promise.resolve(permissionTypesResponse));
        (PermissionAPI.getPermission as any).mockImplementation(() => Promise.resolve(permission));
        (PermissionAPI.updatePermission as any).mockImplementation(() => Promise.resolve({}));

        const getPermissionTypesMock = jest.spyOn(PermissionAPI, "getPermissionTypes");
        const getPermissionMock = jest.spyOn(PermissionAPI, "getPermission");
        const updatePermissionMock = jest.spyOn(PermissionAPI, "updatePermission");

        const navigateMock = jest.fn();
        useNavigateMock.mockReturnValue(navigateMock);
        (useParams as any).mockImplementation(() => ({id : "4"}));

        render(<UpdatePermissionPage />);

        expect(getPermissionMock).toHaveBeenCalledTimes(1);
        expect(getPermissionMock).toHaveBeenCalledWith(4);

        await screen.findByText("Actualizar permiso");

        expect(getPermissionTypesMock).toHaveBeenCalled();

        await act(async () => {
            userEvent.click(await screen.findByRole("combobox", { name: "type-input" }));
        });

        fireEvent.click(await screen.findByRole("option", { name: "write" }));
        fireEvent.click(screen.getByRole("button", { name: "save-btn" }));

        
        expect(updatePermissionMock).toHaveBeenLastCalledWith(permission.permissionId, "1");
        expect(updatePermissionMock).toHaveBeenCalledTimes(1);
        expect(await navigateMock).toHaveBeenCalledWith("/permissions");
        expect(navigateMock).toHaveBeenCalledTimes(1);
    });

    it("shows message when save fails", async () => {
        (PermissionAPI.getPermissionTypes as any).mockImplementation(() => Promise.resolve(permissionTypesResponse));
        (PermissionAPI.getPermission as any).mockImplementation(() => Promise.resolve(permission));
        (PermissionAPI.updatePermission as any).mockImplementation(() => Promise.reject());

        const getPermissionTypesMock = jest.spyOn(PermissionAPI, "getPermissionTypes");
        const getPermissionMock = jest.spyOn(PermissionAPI, "getPermission");
        const updatePermissionMock = jest.spyOn(PermissionAPI, "updatePermission");

        const navigateMock = jest.fn();
        useNavigateMock.mockReturnValue(navigateMock);
        (useParams as any).mockImplementation(() => ({id : "4"}));

        render(<UpdatePermissionPage />);

        expect(getPermissionMock).toHaveBeenCalledTimes(1);
        expect(getPermissionMock).toHaveBeenCalledWith(4);

        await screen.findByText("Actualizar permiso");

        expect(getPermissionTypesMock).toHaveBeenCalled();

        await act(async () => {
            userEvent.click(await screen.findByRole("combobox", { name: "type-input" }));
        });

        fireEvent.click(await screen.findByRole("option", { name: "write" }));
        fireEvent.click(screen.getByRole("button", { name: "save-btn" }));
        
        expect(getPermissionMock).toHaveBeenCalledTimes(1);
        expect(getPermissionMock).toHaveBeenCalledWith(4);
        expect(updatePermissionMock).toHaveBeenCalled();
    });
    

    it("does not show form", async () => {
        (PermissionAPI.getPermission as any).mockImplementation(() => Promise.reject());

        const getPermissionMock = jest.spyOn(PermissionAPI, "getPermission");

        const navigateMock = jest.fn();
        useNavigateMock.mockReturnValue(navigateMock);
        (useParams as any).mockImplementation(() => ({id : "4"}));

        render(<UpdatePermissionPage />);

        expect(getPermissionMock).toHaveBeenCalled();
        expect(await screen.findByText("Sin resultado.")).toBeInTheDocument();
        expect(screen.queryByText("Actualizar permiso")).not.toBeInTheDocument();
        
    });


    it("goes back", async () => {
        (PermissionAPI.getPermissionTypes as any).mockImplementation(() => Promise.resolve(permissionTypesResponse));
        (PermissionAPI.getPermission as any).mockImplementation(() => Promise.resolve(permission));

        const getPermissionMock = jest.spyOn(PermissionAPI, "getPermission");
        const getPermissionTypesMock = jest.spyOn(PermissionAPI, "getPermissionTypes");

        const navigateMock = jest.fn();
        useNavigateMock.mockReturnValue(navigateMock);
        (useParams as any).mockImplementation(() => ({id : "4"}));

        render(<UpdatePermissionPage />);

        await screen.findByText("Actualizar permiso");
        
        expect(getPermissionTypesMock).toHaveBeenCalled();
        expect(getPermissionMock).toHaveBeenCalled();
        
        expect(await screen.findByRole("combobox", { name: "type-input" })).toBeInTheDocument();

        fireEvent.click(screen.getByRole("button", { name: "back-btn" }));

        expect(await navigateMock).toHaveBeenCalledTimes(1);
        expect(navigateMock).toHaveBeenCalledWith(-1);
    });
});