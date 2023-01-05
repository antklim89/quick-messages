/* eslint-disable no-use-before-define */
import { useEffect, useRef, useCallback } from 'react';


interface IReturn {
    addEvent: () => void
    removeEvent: () => void
}

export const useEndScreenTrigger = (cb: () => void, needToAddEvent: boolean, offset = 500): IReturn => {
    const cbRef = useRef(cb);
    cbRef.current = cb;

    const addEvent = useCallback(() => {
        const { documentHeight, scrollHeight } = getHights();

        if (documentHeight <= scrollHeight) cbRef.current();
        else window.addEventListener('scroll', scrollHandle);
    }, []);

    const removeEvent = useCallback(() => window.removeEventListener('scroll', scrollHandle), []);

    const scrollHandle = useCallback(() => {
        const { documentHeight, scrollHeight } = getHights();

        if (documentHeight - scrollHeight < offset) {
            removeEvent();
            cbRef.current();
        }
    }, []);

    useEffect(() => () => window.removeEventListener('scroll', scrollHandle), []);

    if (needToAddEvent) addEvent();

    return { addEvent, removeEvent };
};

function getHights() {
    const scrollHeight = window.scrollY + document.documentElement.clientHeight;
    const documentHeight = document.documentElement.scrollHeight;
    return { documentHeight, scrollHeight };
}

