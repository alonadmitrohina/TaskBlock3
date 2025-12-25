import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import actionSongs from 'app/actions/song';
import actionPlaylists from 'app/actions/playlists';
import SongInList from 'components/SongInList';
import DeleteDialog from 'components/DeleteDialog';
import {useLocation, useNavigate} from 'react-router-dom';
import SongsFilter from "components/SongsFilter";
import Typography from "components/Typography";
import Button from "components/Button";
import BottomBox from "components/BottomBox";
import { Box } from "@mui/material";
import Message from "components/Message";
import SongsPagination from "components/SongsPagination";
import useSaveParams from "misc/hooks/useSaveParams";

function SongsList() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { page, filter, setSaveParams } = useSaveParams();
    const [songToDelete, setSongToDelete] = useState(null);
    const [message, setMessage] = useState({ open: false, message: "" });
    const [localFilter, setLocalFilter] = useState(filter);

    const { list: songsList, isFetchingList, totalPages } = useSelector(({ songs }) => songs);
    const playlists = useSelector(state => state.playlists.list);

    const applyFilter = () => {
        setSaveParams({ page: 0, filter: localFilter });
    };

    const cleanFilter = () => {
        setLocalFilter({});
        setSaveParams({ page: 0, filter: {} });
    };

    const handlePageChange = (newPage) => {
        setSaveParams({ page: newPage, filter: localFilter });
    };

    const handleOpen = (id) => {
        navigate(`/song/${id}?mode=view`);
    };

    const handleAdd = () => {
        navigate('/song/new?mode=create', {
            state: {
                fromSearch: location.search
            }
        });
    };

    const handleDeleting = (song) => setSongToDelete(song);
    const handleDelete = () => {
        if (!songToDelete) return;
        dispatch(actionSongs.deleteSong({ id: songToDelete.id, page, filter }));
        setSongToDelete(null);
        setMessage({ open: true, message: 'Пісню успішно видалено' });
    };

    const handleDeleteClose = () => setSongToDelete(null);

    const handleMessageClose = () => setMessage({ open: false, message: '' });

    useEffect(() => {
        dispatch(actionPlaylists.fetchPlaylists());
        dispatch(actionSongs.fetchSongsList({ page, filter }));
    }, [dispatch, page, filter]);

    useEffect(() => {
        setLocalFilter(filter);
    }, [filter]);

    if (isFetchingList && !songsList.length) return <div>Loading...</div>;

    return (
        <div>
            <Typography variant="title">Усі пісні</Typography>
            <SongsFilter
                filter={localFilter}
                playlists={playlists}
                onApply={applyFilter}
                onChange={setLocalFilter}
                onClean={cleanFilter}
            />

            {songsList.map(song => (
                <SongInList
                    key={song.id}
                    song={song}
                    onDelete={handleDeleting}
                    onOpen={() => handleOpen(song.id)}
                />
            ))}

            <DeleteDialog
                open={Boolean(songToDelete)}
                song={songToDelete}
                onConfirm={handleDelete}
                onClose={handleDeleteClose}
            />

            <Message
                open={message.open}
                message={message.message}
                handleClose={handleMessageClose}
            />

            <BottomBox>
                <Button variant="contained" onClick={handleAdd}>
                    Додати пісню
                </Button>

                <SongsPagination
                    page={page}
                    totalPages={totalPages}
                    onChange={handlePageChange}
                />
            </BottomBox>
        </div>
    );
}

export default SongsList;
