interface Props{
    className?:string;
}

export const DepositsTable:React.FC<Props> = ({className})=>{
    return (
        <div className="mt-[50px] min-h-screen bg-[#f5f5f5] text-black flex ">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full ">
                <h2 className="text-2xl mb-4">Список всех депозитов</h2>
                <table className="w-full table-auto border-collapse">
                    <thead>
                    <tr className="bg-white text-[#b0b0b0]">
                        <th className="px-4 py-2 font-normal text-left">Логин</th>
                        <th className="px-4 py-2 font-normal text-left">Баланс</th>
                        <th className="px-4 py-2 font-normal text-left">Сумма депозита</th>
                        <th className="px-4 py-2 font-normal text-left">Процент</th>
                        <th className="px-4 py-2 font-normal text-left">Сумма вывода</th>
                        <th className="px-4 py-2 font-normal text-left">Дата окончания</th>
                        <th className="px-4 py-2 font-normal text-left">Статус депозита</th>
                    </tr>
                    </thead>
                    <tbody>
                    {[...Array(6)].map((_, idx) => (
                        <tr key={idx} className="border-b">
                            <td className="px-4 py-2">Nickname</td>
                            <td className="px-4 py-2">$200</td>
                            <td className="px-4 py-2">$200</td>
                            <td className="px-4 py-2">10%</td>
                            <td className="px-4 py-2">$200</td>
                            <td className="px-4 py-2">24.12.2202</td>
                            <td className="px-4 py-2 text-green-500">В работе</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}