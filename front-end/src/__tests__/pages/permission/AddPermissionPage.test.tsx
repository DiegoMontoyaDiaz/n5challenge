import { act, fireEvent, render, screen } from "@testing-library/react";
import { AddPermissionPage } from "../../../pages/permission";
import { useNavigate } from "react-router-dom";
import { permissionTypesResponse, permissionCreated } from "../../../__fixtures__/fixtures";
import userEvent from "@testing-library/user-event";

jest.mock("../../../api/permissions", () => {
    return {
        PermissionAPI: {
            getPermissionTypes: jest.fn(),
            requestPermission: jest.fn()
        }
    }
});

jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn(),
}));


const useNavigateMock = jest.mocked(useNavigate);

import { PermissionAPI } from "../../../api/permissions";


describe("<AddPermissionPage />", () => {

    const baseDate = new Date("2024-02-17");

    it("loads", async () => {
        (PermissionAPI.getPermissionTypes as any).mockImplementation(() => Promise.resolve(permissionTypesResponse));

        const navigateMock = jest.fn();
        useNavigateMock.mockReturnValue(navigateMock);

        render(<AddPermissionPage />);

        expect(await screen.findByText("Agregar permiso")).toBeInTheDocument();
    });

    it("saves data", async () => {
        jest.useFakeTimers().setSystemTime(baseDate);

        (PermissionAPI.getPermissionTypes as any).mockImplementation(() => Promise.resolve(permissionTypesResponse));
        (PermissionAPI.requestPermission as any).mockImplementation(() => Promise.resolve(permissionCreated));

        const navigateMock = jest.fn();
        useNavigateMock.mockReturnValue(navigateMock);

        const requestPermissionMock = jest.spyOn(PermissionAPI, "requestPermission");

        render(<AddPermissionPage />);

        fireEvent.change(await screen.findByLabelText("Nombre"), { target: { value: "random" } });
        fireEvent.change(await screen.findByLabelText("Apellido"), { target: { value: "person" } });

        await act(async () => {
            userEvent.click(await screen.findByRole("combobox", { name: "type-input" }));
        });

        fireEvent.click(await screen.findByRole("option", { name: "write" }));
        fireEvent.click(screen.getByRole("button", { name: "save-btn" }));

        expect(requestPermissionMock).toHaveBeenLastCalledWith({
            nombreEmpleado: "random",
            apellidoEmpleado: "person",
            tipoPermiso: "1",
            fechaPermiso: baseDate.toISOString()
        });
        expect(requestPermissionMock).toHaveBeenCalledTimes(1);
        expect(await navigateMock).toHaveBeenCalledWith("/permissions");
        expect(navigateMock).toHaveBeenCalledTimes(1);

        jest.useRealTimers();
    });


    it("does not saves when data is invalid", async () => {
        jest.useFakeTimers().setSystemTime(baseDate);

        (PermissionAPI.getPermissionTypes as any).mockImplementation(() => Promise.resolve(permissionTypesResponse));
        (PermissionAPI.requestPermission as any).mockImplementation(() => Promise.resolve(permissionCreated));

        const navigateMock = jest.fn();
        useNavigateMock.mockReturnValue(navigateMock);

        const requestPermissionMock = jest.spyOn(PermissionAPI, "requestPermission");

        render(<AddPermissionPage />);

        fireEvent.change(await screen.findByLabelText("Nombre"), { target: { value: "" } });
        fireEvent.change(await screen.findByLabelText("Apellido"), { target: { value: "" } });
        fireEvent.click(screen.getByRole("button", { name: "save-btn" }));

        expect(requestPermissionMock).not.toHaveBeenCalled();
        expect(navigateMock).not.toHaveBeenCalled();

        jest.useRealTimers();
    });
    
    it("goes back", async () => {
        (PermissionAPI.getPermissionTypes as any).mockImplementation(() => Promise.resolve(permissionTypesResponse));
        const getPermissionTypesMock = jest.spyOn(PermissionAPI, "getPermissionTypes");

        const navigateMock = jest.fn();
        useNavigateMock.mockReturnValue(navigateMock);

        render(<AddPermissionPage />);

        expect(getPermissionTypesMock).toHaveBeenCalled();
        expect(await screen.findByRole("combobox", { name: "type-input" })).toBeInTheDocument();
        
        fireEvent.click(screen.getByRole("button", { name: "back-btn" }));

        expect(await navigateMock).toHaveBeenCalledTimes(1);
        expect(navigateMock).toHaveBeenCalledWith(-1);
    });

});