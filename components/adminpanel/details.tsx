interface Props{
    className?:string;
}

export const Details:React.FC<Props> = ({className}) => {
    const data = [
        { name: 'BUSDT', address: 'DSJiomO-9e23,JLKAF90-243jt204JIOE92jkl33' },
        { name: 'USDT trc20', address: 'DSJiomO-9e23,JLKAF90-243jt204JIOE92jkl33' },
        { name: 'USDT bep20', address: 'DSJiomO-9e23,JLKAF90-243jt204JIOE92jkl33' },
        { name: 'TRX Tron', address: 'DSJiomO-9e23,JLKAF90-243jt204JIOE92jkl33' },
    ];

    return (
        <div className="flex justify-center w-full bg-[#f5f5f5] pt-[50px] max-w-[100%]">
            <div className="w-full p-6 bg-white rounded-lg shadow-lg">
                <h1 className="text-2xl text-black font-semibold mb-6">Реквизиты</h1>
                <table className="w-full text-left table-auto">
                    <thead className="bg-gray-100">
                    <tr>
                        <th className="px-4 py-2 text-sm font-medium text-gray-600">Название</th>
                        <th className="px-4 py-2 text-sm font-medium text-gray-600">Адрес</th>
                        <th className="px-4 py-2 text-sm font-medium text-gray-600">Функции</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((item, index) => (
                        <tr key={index} className="border-t">
                            <td className="px-4 py-3 text-gray-700">{item.name}</td>
                            <td className="px-4 py-3 text-gray-700">{item.address}</td>
                            <td className="px-4 py-3 text-blue-600 cursor-pointer">Изменить</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}