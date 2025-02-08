import React from "react";
import { AppBar, Toolbar, Typography, Avatar, Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

const NavBar: React.FC = () => {
    return (
        <AppBar position="static">
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="h6" component={Link} to="/" sx={{ textDecoration: "none", color: "white" }}>
                    MyApp
                </Typography>
                <Box sx={{ display: "flex", gap: 2, ml: "auto", alignItems: "center" }}>
                    <Button component={Link} to="/" color="inherit">
                    Posts
                    </Button>
                    <Button component={Link} to="/photos" color="inherit">
                        Photos
                    </Button>
                    <Typography variant="body1">John Doe</Typography>
                    <Avatar alt="John Doe" src="https://i.pravatar.cc/40" />
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
