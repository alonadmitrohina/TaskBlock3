import React from "react";
import { Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import TextField from "../TextField";
import Button from "../Button";
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

function SongsFilter({ filter, playlists, onChange, onApply, onClean }) {
    const handleChange = (key) => (e) => {
        onChange({
            ...filter,
            [key]: e.target.value,
        });
    };

    return (
        <Box sx={{ display: 'flex', gap: 2, mb: 2, alignItems: 'center', flexWrap: 'nowrap' }}>
            <TextField
                label="Виконавець"
                value={filter.artist || ''}
                onChange={handleChange('artist')}
            />

            <TextField
                label="Рік випуску"
                type="number"
                value={filter.year || ''}
                onChange={handleChange('year')}
            />

            <FormControl sx={{ minWidth: 180 }} size="small">
                <InputLabel>Плейліст</InputLabel>
                <Select
                    value={filter.playlistId || ''}
                    label="Плейліст"
                    onChange={handleChange('playlistId')}
                    variant="outlined"
                >
                    <MenuItem value="">Усі плейлісти</MenuItem>
                    {playlists.map(pl => (
                        <MenuItem key={pl.id} value={pl.id}>
                            {pl.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <Button
                variant="contained"
                onClick={onApply}
                size="small"
            >
                <FilterAltIcon />
            </Button>
            <Button
                variant="contained"
                onClick={onClean}
                size="small"
            >
                <CleaningServicesIcon />
            </Button>
        </Box>
    );
}

export default SongsFilter;
