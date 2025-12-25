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

const initialState = {
    list: [],
    current: null,
    isFetchingList: false,
    isFetchingSong: false,
    isCreating: false,
    isEditing: false,
    deletingIds: [],
    page: 0,
    totalPages: 0,
    error: null,
};



export default function Reducer(state = initialState, action) {
    switch (action.type) {

        case REQUEST_SONGS:
            return {
                ...state,
                isFetchingList: true
            };

        case RECEIVE_SONGS:
            return {
                ...state,
                isFetchingList: false,
                ...action.payload
            };

        case ERROR_RECEIVE_SONGS:
            return {
                ...state,
                isFetchingList: false,
                error: action.payload?.error,
            };

        case REQUEST_GET_SONG:
            return { ...state, isFetchingSong: true };

        case SUCCESS_GET_SONG:
            return {
                ...state,
                isFetchingSong: false,
                current: action.payload.song,
            };

        case ERROR_GET_SONG:
            return {
                ...state,
                isFetchingSong: false,
                error: action.payload?.error,
            };

        case REQUEST_CREATE_SONG:
            return {
                ...state,
                isCreating: true,
            };

        case SUCCESS_CREATE_SONG:
            return {
                ...state,
                isCreating: false,
                list: [...state.list, action.payload.song],
                current: action.payload.song,
            };

        case ERROR_CREATE_SONG:
            return {
                ...state,
                isCreating: false,
                error: action.payload?.error,
            };

        case REQUEST_DELETE_SONG:
            return {
                ...state,
                deletingIds: [...state.deletingIds, action.payload.id],
            };

        case SUCCESS_DELETE_SONG:
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== action.payload.id),
                list: state.list.filter(song => song.id !== action.payload.id),
            };

        case ERROR_DELETE_SONG:
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== action.payload.id),
                error: action.payload?.error,
            };

        case REQUEST_UPDATE_SONG:
            return {
                ...state,
                isEditing: true,
            };

        case SUCCESS_UPDATE_SONG:
            return {
                ...state,
                isEditing: false,
                current: action.payload.song,
                list: state.list.map(song =>
                    song.id === action.payload.song.id
                        ? action.payload.song
                        : song
                ),
            };

        case ERROR_UPDATE_SONG:
            return {
                ...state,
                isEditing: false,
                error: action.payload?.error,
            };

        default:
            return state;
    }
}


