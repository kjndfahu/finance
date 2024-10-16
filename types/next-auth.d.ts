import {$Enums} from ".prisma/client";

declare module "next-auth"{
    import Role = $Enums.Role;

    interface User{
        email:string;
        id: number;
    }
    interface Session{
        user: User & {
            id: number;
            login: string;
            email: string
            balance: number
            referralCode: string
            password: string
            role: Role
        }
        token: {
            id: number;
            login: string;
            email: string
            balance: number
            referralCode: string
            password: string
            role: Role
        }
    }
}