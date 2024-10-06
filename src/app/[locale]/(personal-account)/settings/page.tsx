import {Settings} from "../../../../../components/lk/settings";
import {ChangingPasswordSettings} from "../../../../../components/lk/changing-password-settings";

export default function SettingsPage() {
    return (
        <div className="flex flex-col bg-[#f5f5f5] w-full gap-5 ">
            <Settings/>
            <ChangingPasswordSettings/>
        </div>
    )
}