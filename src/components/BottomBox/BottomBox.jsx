import React from "react";
import { Box } from "@mui/material";

function BottomBox({ children }) {
    return (
        <Box
            sx={{
                position: 'fixed',
                bottom: 0,
                width: '65%',
                py: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                gap: 2,
                zIndex: 1000,
            }}
        >
            {children}
        </Box>
    );
}

export default BottomBox;
