import { useMemo, useCallback } from "react";
import {useSearchParams} from "react-router-dom";

const existingFilters = ["artist", "year", "playlistId", 'page'];

const takeParams = (params) => {
    const result = {};
    existingFilters.forEach(key => {
        const value = params.get(key);
        if (value !== null && value !== '') {
            result[key] = value;
        }
    });
    return result;
}

const splitFilterPage = (params) => {
    const {
        page = '0',
        artist = '',
        year = '',
        playlistId = '',
    } = params;

    return {
        page: Number(page) || 0,
        filter: { artist, year, playlistId },
    };
};

export default function useSaveParams(){
    const [searchParams, setSearchParams] = useSearchParams();

    const savedParams = useMemo(
        () => takeParams(searchParams),
        [searchParams]
    );

    const { page, filter } = useMemo(
        () => splitFilterPage(savedParams),
        [savedParams]
    );


    const setSaveParams = useCallback(
        ({ page, filter }, { replace = true } = {}) => {
            const params = {};

            if (filter.artist) params.artist = filter.artist;
            if (filter.year) params.year = filter.year;
            if (filter.playlistId) params.playlistId = filter.playlistId;

            params.page = page;

            setSearchParams(params, { replace });
        },
        [setSearchParams]
    );

    return({
        page,
        filter,
        setSaveParams,
    });

}