
import { render, screen } from "@testing-library/react";
import { PermissionPage } from "../../../pages/permission";
import { MemoryRouter } from "react-router-dom";


jest.mock("../../../api/permissions", () => {
    return {
        PermissionAPI: {
            getPermissionTypes: jest.fn(),
            getPermissions: jest.fn()
        }
    }
});

describe("<PermissionPage />", () => {

    it("loads", () => {
        render(
            <MemoryRouter>
                <PermissionPage />
            </MemoryRouter>
        );

        expect(screen.getByLabelText("permission-container")).toBeInTheDocument();
    });

});
