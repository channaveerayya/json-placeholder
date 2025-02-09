import React from "react";
import { AppBar, Toolbar, Typography, Avatar, Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

const NavBar: React.FC = () => {
    return (
        <AppBar position="static">
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography sx={{ typography: { sm: 'h6', xs: 'body1' },textDecoration: "none", color: "white"  }} component={Link} to="/">
                    JSON Placeholder
                </Typography>
                <Box sx={{ display: "flex", gap: 1, ml: "auto", alignItems: "center" }}>
                    <Button component={Link} to="/" color="inherit">
                    Posts
                    </Button>
                    <Button component={Link} to="/photos" color="inherit">
                        Photos
                    </Button>
                    <Typography sx={{ typography: { sm: 'body1', xs: 'body2' } }}>John Doe</Typography>
                    <Avatar alt="John Doe" src="https://i.pravatar.cc/40" />
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
