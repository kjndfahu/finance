import {$Enums} from ".prisma/client";

declare module "next-auth"{
    import Role = $Enums.Role;

    interface User{
        email:string;
    }
    interface Session{
        user: User & {
            login: string;
            email: string
            balance: number
            referralCode: string
            password: string
            role: Role
        }
        token: {
            login: string;
            email: string
            balance: number
            referralCode: string
            password: string
            role: Role
        }
    }
}