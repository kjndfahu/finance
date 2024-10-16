import {getServerSession} from "next-auth";
import {BurgerMenu} from "../../../../../components/burgermenu";
import {authOptions} from "../../../api/auth/[...nextauth]/route";
export default async function Menu() {
    const session = await getServerSession(authOptions)
    console.log(session)
    return (
        <div className="flex w-full">
            <BurgerMenu session={session}/>
        </div>
    );
}