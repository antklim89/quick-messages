import { subjectSchema } from '~/schemas/subjectSchema';


export function getSubjectsFromLocalStorage() {
    try {
        const localSubjectsStr = localStorage.getItem('LOCALSTORAGE_SUBJECTS');
        const localSubjectsParsed = (localSubjectsStr ? JSON.parse(localSubjectsStr) : []);
        const localSubjects = subjectSchema.array().parse(localSubjectsParsed);
        return localSubjects;
    } catch (error) {
        return [];
    }
}
