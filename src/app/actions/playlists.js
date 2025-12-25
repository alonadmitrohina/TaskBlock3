import playlistsStorage from "../../misc/storage/playlistsStorage";
import { MOCK_PLAYLISTS_RESPONSE } from "../constants/playlistsMockData";
import {
    REQUEST_PLAYLISTS,
    SUCCESS_PLAYLISTS,
    ERROR_PLAYLISTS,
} from "../constants/actionTypes";

const requestPlaylists = () => ({
    type: REQUEST_PLAYLISTS,
});

const successPlaylists = (playlists) => ({
    type: SUCCESS_PLAYLISTS,
    payload: playlists,
});

const errorPlaylists = (error) => ({
    type: ERROR_PLAYLISTS,
    error: error,
});

export const fetchPlaylists = () => (dispatch) => {
    dispatch(requestPlaylists());

    try {
        let playlists = playlistsStorage.getPlaylists();

        if (!playlists || playlists.length === 0) {
            playlistsStorage.savePlaylists(MOCK_PLAYLISTS_RESPONSE);
            playlists = MOCK_PLAYLISTS_RESPONSE;
        }

        dispatch(successPlaylists(playlists));
    } catch (error) {
        dispatch(errorPlaylists(error));
    }
};

const exportFunctions = {
    fetchPlaylists,
};

export default exportFunctions;
