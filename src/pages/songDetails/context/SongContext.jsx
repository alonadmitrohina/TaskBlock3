import { createContext, useContext } from "react";

export const SongContext = createContext(null);

export const useSongContext = () => {
    const ctx = useContext(SongContext);
    if (!ctx) {
        throw new Error();
    }
    return ctx;
};
