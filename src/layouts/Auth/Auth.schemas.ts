import zod from 'zod';


export const authSchema = zod.object({
    email: zod.string()
        .email()
        .trim()
        .max(50)
        .min(2),
    password: zod.string()
        .trim()
        .max(50)
        .min(5),
    confirm: zod.string()
        .trim()
        .max(50)
        .min(5),
});
