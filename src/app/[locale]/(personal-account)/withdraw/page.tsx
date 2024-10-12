import {getServerSession} from "next-auth";
import {authOptions} from "../../../api/auth/[...nextauth]/route";
import {AllWithdrawClient} from "../../../../../components/lk/allwithdrawclient";

export default async function WithdrawPage() {
    const session = await getServerSession(authOptions)
    return (
            <AllWithdrawClient session={session}/>
    )
}