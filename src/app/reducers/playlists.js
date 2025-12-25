import {
    REQUEST_PLAYLISTS,
    SUCCESS_PLAYLISTS,
    ERROR_PLAYLISTS,
} from '../constants/actionTypes';

const initialState = {
    list: [],
    isFetching: false,
    error: null,
};

export default function Reducer(state = initialState, action) {
    switch (action.type) {

        case REQUEST_PLAYLISTS:
            return {
                ...state,
                isFetching: true,
                error: null,
            };

        case SUCCESS_PLAYLISTS:
            return {
                ...state,
                isFetching: false,
                list: action.payload,
            };

        case ERROR_PLAYLISTS:
            return {
                ...state,
                isFetching: false,
                error: action.error,
            };

        default:
            return state;
    }
}
