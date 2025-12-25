import React from "react";
import Dialog from "../Dialog";
import Typography from "../Typography";
import Card from "../Card";
import Button from "../Button";
import {DialogActions} from "@mui/material";

function DeleteDialog({ open, song, onConfirm, onClose, error }) {
    return (
        <Dialog open={open} onClose={onClose}>
            <Typography variant="title">
                Видалити пісню?
            </Typography>

            <Card customBackground='white'>
                <Typography variant="title">
                    {song?.name}
                </Typography>

                {error && (
                    <Typography color="error">
                        {error}
                    </Typography>
                )}
            </Card>

            <DialogActions>
                <Button onClick={onClose}>
                    Скасувати
                </Button>

                <Button color="error" onClick={onConfirm}>
                    Видалити
                </Button>
            </DialogActions>
        </Dialog>
    );
}


export default DeleteDialog;