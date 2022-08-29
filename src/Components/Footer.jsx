import { Link, Typography } from "@mui/material";
import React from 'react';

export default function Footer(props) {
    

    return (
            <Typography variant="h6" color="white" align="center" marginTop={"30px"} {...props}>
                {'Copyright © '}
                <Link color="inherit" href="/">
                   2B Digital
                </Link>{' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
    )
}