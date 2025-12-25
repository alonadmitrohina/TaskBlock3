import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import actionSongs from 'app/actions/song';
import actionPlaylists from 'app/actions/playlists';
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import {SongContext} from "../context/SongContext";
import SongFields from "../../../components/SongFields";

function SongDetails() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();
    const [searchParams] = useSearchParams();
    const mode = searchParams.get('mode');
    const playlists = useSelector(state => state.playlists.list || []);

    const currentSong = useSelector(state => state.songs.current);
    const isFetching = useSelector(state => state.songs.isFetchingSong);

    const [data, setData] = useState({
        id: '',
        name: '',
        artist: '',
        year: '',
        playlistId: '',
    });
    const [errors, setErrors] = useState({});


    const backToList = () => {
        navigate(`/songs`);
    };

    const toUpdate = () => {
        navigate(`/song/${currentSong.id}?mode=edit`);
    }

    const toView = () => {
        navigate(`/song/${currentSong.id}?mode=view`);
    };

    const handleChange = (field, value) => {
        setData(prev => ({ ...prev, [field]: value }));
        setErrors(prev => ({ ...prev, [field]: '' }));
    };

    const handleUpdate = () => {
        dispatch(actionSongs.editSong({
            ...data,
        }));
        navigate(`/song/${currentSong.id}?mode=view`);
    };

    const handleCreate = () => {
        if (!validateCreate()) return;
        dispatch(actionSongs.createSong(data));
        navigate(`/song/${currentSong.id}?mode=view`);
    };

    const validateCreate = () => {
        const newErrors = {};

        if (!data.name) newErrors.name = 'Назва обовʼязкова';
        if (!data.artist) newErrors.artist = 'Виконавець обовʼязковий';
        if (!data.year) newErrors.year = 'Рік обовʼязковий';
        if (!data.playlistId) newErrors.playlistId = 'Плейліст обовʼязковий';

        if (Number(data.year) > new Date().getFullYear() || data.year < 1500) newErrors.year = 'Невалідний рік';

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };



    useEffect(() => {
        if (id && id !== 'new') {
            dispatch(actionSongs.getSong(id));
            dispatch(actionPlaylists.fetchPlaylists());
        }
    }, [id, dispatch]);

    useEffect(() => {
        if (mode !== 'create' && currentSong) {
            setData({
                id:currentSong.id,
                name: currentSong.name,
                artist: currentSong.artist,
                year: currentSong.year,
                playlistId: currentSong.playlistId,
            });
        }
    }, [mode, currentSong]);

    if (id !== 'new' && isFetching && !currentSong) {
        return <div>Loading...</div>;
    }

    const contextValue = {
        mode,
        currentSong,
        data,
        errors,
        playlists,
        handleChange,
        handleCreate,
        handleUpdate,
        backToList,
        toUpdate,
        toView,
    };

    return (
        <SongContext.Provider value={contextValue}>
            <SongFields />
        </SongContext.Provider>
    );
}



export default SongDetails;

