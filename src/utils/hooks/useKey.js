import { useEffect, useRef } from 'react';

export const useKey = (key, callBack) => {
    const callbackRef = useRef(callBack);

    useEffect(() => {
        callbackRef.current = callBack;
    });

    useEffect(() => {
        const handle = (e) => {
            if (e.code === key) {
                callbackRef.current(e);
            }
        }
        document.addEventListener("keydown", handle);
        return() => document.removeEventListener("keydown", handle);
    }, [key]);
}