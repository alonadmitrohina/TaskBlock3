import React from 'react';
import Typography from '../Typography';
import SongBox from '../SongBox';
import {Box} from "@mui/material";
import IconButton from "../IconButton";
import SongCard from "../SongCard";
import DeleteIcon from '@mui/icons-material/Delete';


function SongInList({ song, onDelete, onOpen }) {
    return (
        <SongCard
            onClick={() => onOpen(song.id)}
        >
            <SongBox>
                <Box>
                    <Typography variant="title" color="primary">
                        {song.name}
                    </Typography>
                    <Typography variant="subTitle" color="secondary">
                        {song.artist}
                    </Typography>
                </Box>

                <Box className="actions" sx={{ opacity: 0, transition: '0.3s' }}>
                    <IconButton
                        color="error"
                        onClick={(e) => {
                            e.stopPropagation();
                            onDelete(song);
                        }}
                    >
                        <DeleteIcon />
                    </IconButton>
                </Box>
            </SongBox>
        </SongCard>
    );
}

export default SongInList;
