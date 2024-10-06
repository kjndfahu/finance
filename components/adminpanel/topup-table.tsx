interface Props{
    className?:string;
}

export const TopUpTable:React.FC<Props> = ({className})=>{
    return (
        <div className="mt-[50px] bg-[#f5f5f5] text-black flex ">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full ">
                <h2 className="text-2xl mb-4">Заявки пополнения</h2>
                <table className="w-full table-auto border-collapse">
                    <thead>
                    <tr className="bg-white text-[#b0b0b0]">
                        <th className="px-4 py-2 font-normal text-left">Логин</th>
                        <th className="px-4 py-2 font-normal text-left">Способ</th>
                        <th className="px-4 py-2 font-normal text-left">Дата заявки</th>
                        <th className="px-4 py-2 font-normal text-left">Сумма заявки</th>
                        <th className="px-4 py-2 font-normal text-left">Функции</th>
                    </tr>
                    </thead>
                    <tbody>
                    {[...Array(6)].map((_, idx) => (
                        <tr key={idx} className="border-b">
                            <td className="px-4 py-2">Nickname</td>
                            <td className="px-4 py-2">BUSDT</td>
                            <td className="px-4 py-2">24.12.2202</td>
                            <td className="px-4 py-2">$200</td>
                            <td className="px-4 py-2 flex flex-col items-start">
                                <h2 className="text-green-500 py-1 rounded">Одобрить</h2>
                                <h2 className=" text-red-500 py-1 rounded">Отклонить</h2>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}