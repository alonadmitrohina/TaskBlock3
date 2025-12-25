import songsStorage from 'misc/storage/songStorage';
import {
    RECEIVE_SONGS,
    REQUEST_SONGS,
    ERROR_RECEIVE_SONGS,
    REQUEST_GET_SONG,
    REQUEST_DELETE_SONG,
    REQUEST_CREATE_SONG,
    REQUEST_UPDATE_SONG,
    SUCCESS_GET_SONG,
    SUCCESS_DELETE_SONG,
    SUCCESS_CREATE_SONG,
    SUCCESS_UPDATE_SONG,
    ERROR_GET_SONG,
    ERROR_DELETE_SONG,
    ERROR_CREATE_SONG,
    ERROR_UPDATE_SONG,
} from '../constants/actionTypes';
import { MOCK_SONGS_RESPONSE } from "../constants/songsMockData"


const pageSize = 5;


const requestSongs = () => ({
    type: REQUEST_SONGS,
});

const receiveSongs = (payload) => ({
    type: RECEIVE_SONGS,
    payload,
});

const errorReceiveSongs = (error) => ({
    type: ERROR_RECEIVE_SONGS,
    payload: { error },
});



const requestGetSong = (id) => ({
    type: REQUEST_GET_SONG,
    payload: { id },
});

const requestDeleteSong = (id) => ({
    type: REQUEST_DELETE_SONG,
    payload: { id },
});

const requestCreateSong = () => ({
    type: REQUEST_CREATE_SONG,
});

const requestUpdateSong = () => ({
    type: REQUEST_UPDATE_SONG,
});



const successGetSong = (song) => ({
    type: SUCCESS_GET_SONG,
    payload: { song },
});

const successDeleteSong = (id) => ({
    type: SUCCESS_DELETE_SONG,
    payload: { id },
});

const successCreateSong = (song) => ({
    type: SUCCESS_CREATE_SONG,
    payload: { song },
});

const successUpdateSong = (song) => ({
    type: SUCCESS_UPDATE_SONG,
    payload: { song },
});



const errorGetSong = (error) => ({
    type: ERROR_GET_SONG,
    payload: { error },
});

const errorDeleteSong = (error) => ({
    type: ERROR_DELETE_SONG,
    payload: { error },
});

const errorCreateSong = (error) => ({
    type: ERROR_CREATE_SONG,
    payload: { error },
});

const errorUpdateSong = (error) => ({
    type: ERROR_UPDATE_SONG,
    payload: { error },
});



const fetchSongsList = ({ page = 0, filter = {} }) => (dispatch) => {
    dispatch(requestSongs());

    const songsList = checkSongsList(songsStorage.getSongs());

    if (!songsList) {
        dispatch(errorReceiveSongs('No songs in the list...'));
        return;
    }

    const filteredSongs = filterSongs(songsList, filter);

    const totalPages = Math.ceil(filteredSongs.length / pageSize);
    const start = page * pageSize;

    dispatch(receiveSongs({
        list: filteredSongs.slice(start, start + pageSize),
        totalPages,
        page,
        pageSize,
    }));
};

const getSong = (id) => (dispatch) => {
    dispatch(requestGetSong(id));

    const song = songsStorage.getSong(id);
    if (!song) {
        dispatch(errorGetSong('SongInList not found'));
        return;
    }
    dispatch(successGetSong(song));
};

const deleteSong = ({id, page }) => (dispatch) => {
    dispatch(requestDeleteSong(id));
    const songsList = songsStorage.getSongs();
    const updatedSongs = songsList.filter(song => song.id !== id);
    songsStorage.saveSongs(updatedSongs);
    dispatch(successDeleteSong(id));

    const maxPage = Math.max(
        0,
        Math.ceil(updatedSongs.length / pageSize) - 1
    );

    const newPage = Math.min(page, maxPage);

    dispatch(fetchSongsList({
        page: newPage,
    }));
};

const requestForCreation = () => (dispatch) => {
    dispatch(requestCreateSong());
};

const createSong = (song) => (dispatch) => {
    if (!song.name || !song.artist || !song.year || !song.playlistId) {
        dispatch(errorCreateSong('Invalid song data'));
        return;
    }

    const newSong = {
        ...song,
        id: Date.now(),
    };
    const songsList = songsStorage.getSongs();
    const updatedSongs = [...songsList, newSong];

    songsStorage.saveSongs(updatedSongs);
    dispatch(successCreateSong(newSong));
};

const requestForEditing = () => (dispatch) => {
    dispatch(requestUpdateSong());
};

const editSong = (song) => (dispatch) => {
    const songsList = songsStorage.getSongs();
    const songIndex = songsList.findIndex(s => s.id === song.id);
    if (songIndex === -1) {
        dispatch(errorUpdateSong('Song not found'));
        return;
    }
    const existingSong = songsList[songIndex];

    validationUpdate(song, existingSong);

    const updatedSong = {
        ...existingSong,
        name: song.name ?? existingSong.name,
        artist: song.artist ?? existingSong.artist,
        year: song.year ?? existingSong.year,
        playlistId: song.playlistId ?? existingSong.playlistId,
    };

    const updatedSongs = [...songsList];
    updatedSongs[songIndex] = updatedSong;

    songsStorage.saveSongs(updatedSongs);
    dispatch(successUpdateSong(updatedSong));
};



const filterSongs = (songs, filter) => {
    if(Object.keys(filter).length === 0){
        return songs;
    }

    let filteredSongs = [...songs];

    if (filter.playlistId) {
        filteredSongs = filteredSongs.filter(
            song => song.playlistId === Number(filter.playlistId)
        );
    }

    if (filter.artist) {
        filteredSongs = filteredSongs.filter(
            song => song.artist.includes(filter.artist)
        );
    }

    if (filter.year) {
        filteredSongs = filteredSongs.filter(
            song => song.year === Number(filter.year)
        );
    }

    return filteredSongs;
}

const checkSongsList = (songsList) => {
    if (!songsList || songsList.length === 0) {
        songsStorage.saveSongs(MOCK_SONGS_RESPONSE);
        songsList = MOCK_SONGS_RESPONSE;
    }
    return songsList;
};

const validationUpdate = (song, existingSong) => (dispatch) => {
    if (!song.name && !song.artist && !song.year && !song.playlistId) {
        dispatch(errorUpdateSong('Nothing to edit'));
        return;
    }

    if (
        existingSong.name === song.name &&
        existingSong.artist === song.artist &&
        existingSong.year === song.year &&
        existingSong.playlistId === song.playlistId
    ) {
        dispatch(errorUpdateSong('No changes to edit'));
    }
}



const exportFunctions = {
    fetchSongsList,
    deleteSong,
    getSong,
    createSong,
    requestForCreation,
    requestForEditing,
    editSong,
};

export default exportFunctions;
