import { useEffect, useRef } from 'react';

export const UseKey = (key: any, callBack: any) => {
    const callbackRef = useRef(callBack);

    useEffect(() => {
        callbackRef.current = callBack;
    });

    useEffect(() => {
        const handle = (e: any) => {
            if (e.code === key) {
                callbackRef.current(e);
            }
        }
        document.addEventListener('keydown', handle);
        return() => document.removeEventListener('keydown', handle);
    }, [key]);
}