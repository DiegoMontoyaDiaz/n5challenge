import { fireEvent, render, screen } from "@testing-library/react";
import { LoginPage } from "../../../pages/login";
import { useNavigate } from "react-router-dom";
import { loginResponse } from "../../../__fixtures__/fixtures";

jest.mock("axios", () => {
    return {
        __esModule: true,
        default: {
            post: jest.fn()
        }
    };
});

jest.mock("../../../api/auth", () => {
    return {
        AuthAPI: {
            login: jest.fn()
        }
    };
});

jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn(),
}));

const useNavigateMock = jest.mocked(useNavigate);

import { AuthAPI } from "../../../api/auth";

describe("<LoginPage />", () => {

    it("loads", () => {
        render(<LoginPage />);

        expect(screen.getByText("Ingresar")).toBeInTheDocument();
        expect(screen.getByLabelText("Nombre de usuario")).toBeInTheDocument();

    });

    it("does login", async () => {
        (AuthAPI.login as any).mockImplementation(() => Promise.resolve({ data: loginResponse }));
        const spy = jest.spyOn(AuthAPI, 'login');
        const navigateMock = jest.fn();

        useNavigateMock.mockReturnValue(navigateMock);

        render(<LoginPage />);

        const input = screen.getByLabelText("Nombre de usuario");
        const submit = screen.getByRole("button", { name: "login-btn" });

        fireEvent.change(input, { target: { value: "username" } });
        fireEvent.click(submit);

        expect(spy).toHaveBeenCalledWith("username");
        expect(await navigateMock).toHaveBeenCalledWith("permissions");
    });

    it("does not login if username is empty", async () => {
        (AuthAPI.login as any).mockImplementation(() => Promise.resolve({ data: loginResponse }));
        const spy = jest.spyOn(AuthAPI, 'login');
        const navigateMock = jest.fn();

        useNavigateMock.mockReturnValue(navigateMock);

        render(<LoginPage />);

        const input = screen.getByLabelText("Nombre de usuario");
        const submit = screen.getByRole("button", { name: "login-btn" });

        fireEvent.change(input, { target: { value: "        " } });
        fireEvent.click(submit);

        expect(spy).toHaveBeenCalledTimes(0);
        expect(await navigateMock).toHaveBeenCalledTimes(0);
    });

});
