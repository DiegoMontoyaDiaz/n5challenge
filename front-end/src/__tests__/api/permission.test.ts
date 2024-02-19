import { permission, permissions, permissionTypesResponse, permissionCreated } from "../../__fixtures__/fixtures";

jest.mock("../../api/base", () => {
    return {
        __esModule: true,
        default: {
            post: jest.fn(),
            get: jest.fn(),
            patch: jest.fn()
        }
    };
});

import { PermissionAPI } from "../../api/permissions";
import Request from "../../api/base";


test("PermissionAPI:getPermission", async () => {
    (Request.get as any).mockImplementation(() => Promise.resolve({ data: permission }));
    const spy = jest.spyOn(Request, 'get');

    let response = await PermissionAPI.getPermission(1);

    expect(response).toEqual(permission);
    expect(spy).toHaveBeenCalledTimes(1);
});

test("PermissionAPI:getPermissions", async () => {
    (Request.get as any).mockImplementation(() => Promise.resolve({ data: permissions }));
    const spy = jest.spyOn(Request, 'get');

    let response = await PermissionAPI.getPermissions();

    expect(response).toEqual(permissions);
    expect(spy).toHaveBeenCalledTimes(1);
});


test("PermissionAPI:getPermissionTypes", async () => {
    (Request.get as any).mockImplementation(() => Promise.resolve({ data: permissionTypesResponse }));
    const spy = jest.spyOn(Request, 'get');

    let response = await PermissionAPI.getPermissionTypes();

    expect(response).toEqual(permissionTypesResponse);
    expect(spy).toHaveBeenCalledTimes(1);
});


test("PermissionAPI:requestPermission", async () => {
    (Request.post as any).mockImplementation(() => Promise.resolve({ data: permissionCreated }));
    const spy = jest.spyOn(Request, 'post');

    let response = await PermissionAPI.requestPermission({
        nombreEmpleado: "Test", apellidoEmpleado: "Test", fechaPermiso: "2024-02-17", tipoPermiso: "write", permissionId: 0
    });

    expect(response).toEqual(permissionCreated);
    expect(spy).toHaveBeenCalledTimes(1);
});


test("PermissionAPI:updatePermission", async () => {
    (Request.patch as any).mockImplementation(() => Promise.resolve({}));
    const spy = jest.spyOn(Request, 'patch');

    await PermissionAPI.updatePermission(1, "write");

    expect(spy).toHaveBeenCalledTimes(1);
});
