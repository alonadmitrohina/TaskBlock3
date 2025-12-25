import {getSong, getSongs, saveSongs, SONGS_KEY} from "./songStorage";

export const PLAYLISTS_KEY = 'PLAYLISTS';

export const getPlaylists = () => {
    const playlists = localStorage.getItem(PLAYLISTS_KEY);
    return playlists ? JSON.parse(playlists) : [];
}

export const savePlaylists = (playlists) => {
    localStorage.setItem(PLAYLISTS_KEY, JSON.stringify(playlists));
}

const forExport = {
    getPlaylists,
    savePlaylists,
};

export default forExport;

