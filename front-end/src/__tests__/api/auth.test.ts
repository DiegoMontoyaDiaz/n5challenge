
import { loginResponse } from "../../__fixtures__/fixtures";

jest.mock("axios", () => {
    return {
        __esModule: true,
        default: {
            post: jest.fn()
        }
    };
});

import { AuthAPI } from "../../api/auth";
import axios from "axios";


test("AuthAPI", async () => {
    (axios.post as any).mockImplementation(() => Promise.resolve({data: loginResponse}));
    const spy = jest.spyOn(axios, 'post');

    let response = await AuthAPI.login("username");

    expect(response).toEqual(loginResponse);
    expect(spy).toHaveBeenCalledTimes(1);
});
