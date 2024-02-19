import { Typography } from "@mui/material";
import React from "react";

interface TitleProps {
    children?: React.ReactNode;
}

export const Title: React.FC<any> = (props: TitleProps) => {
    return (
        <Typography component="h2" variant="h6" color="primary" gutterBottom>
            {props.children}
        </Typography>
    );
};
