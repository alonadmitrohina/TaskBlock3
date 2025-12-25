import React from "react";
import { TextField, FormControl } from "@mui/material";

export default function SongTextField({
                                           label,
                                           value,
                                           onChange,
                                           error,
                                           helperText,
                                           disabled = false,
                                           type = "text"
                                       }) {
    const disabledFieldStyle = {
        "& .MuiInputBase-input.Mui-disabled": {
            color: "black",
            WebkitTextFillColor: "black",
        },
        "& .MuiInputLabel-root.Mui-disabled": {
            color: "gray",
        },
    };

    return (
        <FormControl fullWidth margin="normal">
            <TextField
                label={label}
                variant="outlined"
                value={value}
                onChange={onChange}
                error={error}
                helperText={helperText}
                disabled={disabled}
                type={type}
                sx={disabledFieldStyle}
            />
        </FormControl>
    );
}
