import {z} from 'zod'

export const passwordSchema = z.string().min(4, {message: 'Введите корректный пароль'})

export const formLoginSchema = z.object({
    email: z.string().email('Введите корректную почту'),
    password: passwordSchema
})

export const formRegisterSchema = formLoginSchema
    .merge(
        z.object({
            login: z.string().min(2, {message: 'Введите корректно логин'}),
            name: z.string().min(2, {message: 'Введите корректно имя'}),
            surname: z.string().min(2, {message: 'Введите корректно фамилию'}),
            confirmPassword: passwordSchema,
            phoneNumber: z.string().min(10, {message: 'Введите корректно номер телефона'}),
            region: z.string().min(1, {message: 'Введите корректно номер региона'}),
            telegramId: z.string().min(3, {message: 'Введите корректно телеграм айди'}),
            referralCode: z.string()
        })
    )
    .refine((data) => data.password === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'],
});

export type TFormLoginData = z.infer<typeof formLoginSchema>;
export type TFormRegisterData = z.infer<typeof formRegisterSchema>;