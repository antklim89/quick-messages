import { z } from 'zod';


const LOCAL_STORAGE_SUBJECTS = 'LOCAL_STORAGE_SUBJECTS';

export function getPreviouslySelectedSubjects(): string[] {
    try {
        const localSubjectsStr = localStorage.getItem(LOCAL_STORAGE_SUBJECTS);
        const localSubjectsParsed = (localSubjectsStr ? JSON.parse(localSubjectsStr) : []);
        const localSubjects = z.string().array().parse(localSubjectsParsed);
        return localSubjects;
    } catch (error) {
        return [];
    }
}

export function addToPreviouslySelectedSubjects(subject: string): void {
    const subjects = getPreviouslySelectedSubjects();
    const localSubjectsStr = JSON.stringify([...new Set([subject, ...subjects.slice(0, 9)])]);
    localStorage.setItem(LOCAL_STORAGE_SUBJECTS, localSubjectsStr);
}
