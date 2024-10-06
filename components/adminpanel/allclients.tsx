interface Props{
    className?:string;
}

export const AllClients:React.FC<Props> = ({ className})=>{
    return (
        <div className="mt-[50px] bg-[#f5f5f5] text-black flex flex-col gap-[50px]">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full ">
                <h2 className="text-2xl mb-4">Список всех клиентов</h2>
                <table className="w-full table-auto border-collapse">
                    <thead>
                    <tr className="bg-white text-[#b0b0b0]">
                        <th className="px-4 py-2 font-normal text-left">Логин</th>
                        <th className="px-4 py-2 font-normal text-left">Пароль</th>
                        <th className="px-4 py-2 font-normal text-left">Баланс</th>
                        <th className="px-4 py-2 font-normal text-left">Пополнено</th>
                        <th className="px-4 py-2 font-normal text-left">Выведено</th>
                        <th className="px-4 py-2 font-normal text-left">Имя</th>
                        <th className="px-4 py-2 font-normal text-left">Телефон</th>
                        <th className="px-4 py-2 font-normal text-left">Telegram</th>
                        <th className="px-4 py-2 font-normal text-left">Функция</th>
                    </tr>
                    </thead>
                    <tbody>
                    {[...Array(6)].map((_, idx) => (
                        <tr key={idx} className="border-b">
                            <td className="px-4 py-2">Nickname</td>
                            <td className="px-4 py-2">312334</td>
                            <td className="px-4 py-2">$200</td>
                            <td className="px-4 py-2">$200</td>
                            <td className="px-4 py-2">$200</td>
                            <td className="px-4 py-2">Александр</td>
                            <td className="px-4 py-2">+795281222</td>
                            <td className="px-4 py-2">@username</td>
                            <td className="px-4 py-2 text-red-500">Удалить клиента</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}