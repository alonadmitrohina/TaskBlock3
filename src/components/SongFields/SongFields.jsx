import React from "react";
import {FormHelperText, InputLabel, MenuItem, Select, Box, FormControl} from "@mui/material";
import Button from "../Button";
import {useSongContext} from "../../pages/songDetails/context/SongContext";
import SongTextField from "../SongTextField";
import EditIcon from '@mui/icons-material/Edit';

export default function SongFields() {
    const {playlists, mode, handleCreate, handleChange, handleUpdate, backToList, toView, data, errors, toUpdate} = useSongContext();
    const isViewMode = mode === 'view';
    const playlist = playlists.find(p => p.id === data.playlistId);

    return (
        <Box sx={{ width: '100%', maxWidth: 800, mx: 'auto', p: 2 }}>
            {isViewMode && (
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                    <Button onClick={toUpdate} sx={{ minWidth: 0, p: 1 }}>
                        <EditIcon />
                    </Button>
                </Box>
            )}

            <SongTextField
                label="Назва"
                value={data.name}
                onChange={(e) => handleChange("name", e.target.value)}
                error={!!errors.name}
                helperText={errors.name}
                disabled={isViewMode}
            />

            <SongTextField
                label="Виконавець"
                value={data.artist}
                onChange={(e) => handleChange("artist", e.target.value)}
                error={!!errors.artist}
                helperText={errors.artist}
                disabled={isViewMode}
            />

            <SongTextField
                label="Рік випуску"
                type="number"
                value={data.year}
                onChange={(e) => handleChange("year", e.target.value)}
                error={!!errors.year}
                helperText={errors.year}
                disabled={isViewMode}
            />

            {!isViewMode && (
                <FormControl fullWidth error={!!errors.playlistId} sx={{ mb: 2 }}>
                    <InputLabel>Плейліст</InputLabel>
                    <Select
                        variant="outlined"
                        value={data.playlistId}
                        onChange={(e) => handleChange('playlistId', e.target.value)}
                        label="Плейліст"
                        fullWidth
                    >
                        {playlists.map(pl => (
                            <MenuItem key={pl.id} value={pl.id}>{pl.name}</MenuItem>
                        ))}
                    </Select>
                    {errors.playlistId && <FormHelperText>{errors.playlistId}</FormHelperText>}
                </FormControl>
            )}

            {isViewMode && (
                <SongTextField
                    label="Плейліст"
                    value={playlist?.name || ""}
                    disabled
                />
            )}

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3 }}>
                {mode === 'create' && <>
                    <Button onClick={handleCreate}>Додати</Button>
                    <Button onClick={backToList}>Скасувати</Button>
                </>}
                {mode === 'edit' && <>
                    <Button onClick={handleUpdate}>Зберегти</Button>
                    <Button onClick={toView}>Скасувати</Button>
                </>}
                {mode === 'view' && <Button onClick={backToList}>Назад</Button>}
            </Box>
        </Box>
    );
}
