import React from 'react';
import {Box} from "@mui/material";

function SongBox({children}) {

    return (
        <Box
            sx = {{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0 16px',
                '&:hover .actions': { opacity: 1 },
            }}
        >
            {children}
        </Box>
    );
}

export default SongBox;
