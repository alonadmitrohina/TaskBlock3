export const SONGS_KEY = 'SONGS';

export const getSongs = () => {
    const songs = localStorage.getItem(SONGS_KEY);
    return songs ? JSON.parse(songs) : [];
};

export const saveSongs = (songs) => {
    localStorage.setItem(SONGS_KEY, JSON.stringify(songs));
};

export const getSong = (id) => {
    const songs = getSongs();
    return songs.find(song => song.id === Number(id));
};

const forExport = {
    getSongs,
    saveSongs,
    getSong,
};

export default forExport;