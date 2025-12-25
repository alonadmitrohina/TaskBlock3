import React from "react";
import {Alert, Snackbar} from "@mui/material";

function Message({
                     open,
                     message,
                     severity = "success",
                     duration = 4000,
                     handleClose,
                 }){

    return (
        <>
            <Snackbar
                open={open}
                autoHideDuration={duration}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert
                    onClose={handleClose}
                    severity={severity}
                    variant='standard'
                    sx={{ width: '100%' }}
                >
                    {message}
                </Alert>
            </Snackbar>
        </>
    );
}

export default Message;
