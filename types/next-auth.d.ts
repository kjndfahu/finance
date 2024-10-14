import {$Enums} from ".prisma/client";

declare module "next-auth"{
    import Role = $Enums.Role;

    interface User{
        email:string;
        userId: number;
    }
    interface Session{
        user: User & {
            userId: number;
            login: string;
            email: string
            balance: number
            referralCode: string
            password: string
            role: Role
        }
        token: {
            userId: number;
            login: string;
            email: string
            balance: number
            referralCode: string
            password: string
            role: Role
        }
    }
}