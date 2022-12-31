/* eslint-disable no-use-before-define */
import { useEffect, useRef, useCallback } from 'react';


interface IReturn {
    addEvent: () => void
    removeEvent: () => void
}

export const useEndScreenTrigger = (cb: () => void, offset = 5): IReturn => {
    const cbRef = useRef(cb);
    cbRef.current = cb;

    const addEvent = useCallback(() => window.addEventListener('scroll', scrollHandle), []);
    const removeEvent = useCallback(() => window.removeEventListener('scroll', scrollHandle), []);

    const scrollHandle = useCallback(() => {
        const scroll = window.scrollY + document.documentElement.clientHeight;
        const docHeight = document.documentElement.scrollHeight;
        if (docHeight - scroll < offset) {
            removeEvent();
            cbRef?.current();
        }
    }, []);

    useEffect(() => () => window.removeEventListener('scroll', scrollHandle), []);

    return { addEvent, removeEvent };
};
