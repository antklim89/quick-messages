import { uniqBy } from 'lodash';
import { subjectSchema } from '~/schemas/subjectSchema';
import { ISubject } from '~/types';


const LOCALSTORAGE_SUBJECTS = 'LOCALSTORAGE_SUBJECTS';


export function getSubjectsFromLocalStorage(): ISubject[] {
    try {
        const localSubjectsStr = localStorage.getItem(LOCALSTORAGE_SUBJECTS);
        const localSubjectsParsed = (localSubjectsStr ? JSON.parse(localSubjectsStr) : []);
        const localSubjects = subjectSchema.array().parse(localSubjectsParsed);
        return localSubjects;
    } catch (error) {
        return [];
    }
}

export function setSubjectsToLocalStorage(subjects: ISubject[]): void {
    const localSubjectsStr = JSON.stringify(uniqBy(subjects, 'body'));
    localStorage.setItem(LOCALSTORAGE_SUBJECTS, localSubjectsStr);
}

export function addSubjectToLocalStorage(subject: ISubject): void {
    const subjects = getSubjectsFromLocalStorage();
    setSubjectsToLocalStorage(uniqBy([subject, ...subjects.slice(0, 9)], 'body'));
}

export function removeSubjectToLocalStorage(subjectToDelete: string): void {
    const subjects = getSubjectsFromLocalStorage();
    setSubjectsToLocalStorage(uniqBy(subjects.filter(({ body }) => body === subjectToDelete), 'body'));
}