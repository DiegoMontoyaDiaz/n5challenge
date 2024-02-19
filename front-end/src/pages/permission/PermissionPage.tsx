import { Box, Container, CssBaseline, Grid, ThemeProvider, createTheme } from "@mui/material";
import { Outlet } from "react-router-dom";


const defaultTheme = createTheme();

export const PermissionPage: React.FC<any> = () => {
    return (
        <ThemeProvider theme={defaultTheme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                    }}
                    aria-label="permission-container"
                >
                    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                        <Grid container spacing={2}>
                            <Outlet />
                        </Grid>
                    </Container>
                </Box>
            </Box>
        </ThemeProvider >
    );
};
