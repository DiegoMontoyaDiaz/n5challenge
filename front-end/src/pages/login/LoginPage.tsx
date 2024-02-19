import { Box, Button, Container, Paper, Stack, TextField } from "@mui/material";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthAPI } from "../../api/auth";
import { Title } from "../../components/title";

export const LoginPage: React.FC<any> = () => {

    const [user, setUser] = useState("");
    const navigate = useNavigate();

    const login = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (user.trim().length > 0) {
            AuthAPI.login(user).then((auth) => {
                window.localStorage.setItem("token", auth.token);
                window.localStorage.setItem("user", user);
                navigate("permissions");
            });
        }
    };

    const onChangeUser = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value as string;
        setUser(value);
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                <Title> Login </Title>
                <Box
                    component="form"
                    noValidate
                    autoComplete="off"
                    onSubmit={login}
                >
                    <Stack direction={"column"} spacing={2}>
                        <TextField label="Nombre de usuario" variant="outlined" value={user} onChange={onChangeUser} aria-label="username"/>
                        <Button type="submit" variant="contained" aria-label="login-btn">
                            Ingresar
                        </Button>
                    </Stack>
                </Box>
            </Paper>
        </Container>
    );
};
