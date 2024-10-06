interface Props{
    className?:string;
}

export const ExtraFunctions:React.FC<Props> = ({className})=>{
    return (
        <div className="w-full  bg-gray-100 flex">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full">
                <h2 className="text-2xl text-black mb-6">Дополнительно</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <h3 className="text-lg text-black font-medium mb-2">Начислить баланс</h3>
                        <input
                            type="email"
                            placeholder="E-Mail Клиента"
                            className="border bg-white text-black border-gray-300 rounded w-full p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <input
                            type="number"
                            placeholder="Сумма"
                            className="border bg-white text-black border-gray-300 rounded w-full p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <button className="bg-blue-600 text-white px-6 py-2 rounded w-full">Начислить</button>
                    </div>


                    <div>
                        <h3 className="text-lg text-black font-medium mb-2">Снять баланс</h3>
                        <input
                            type="email"
                            placeholder="E-Mail Клиента"
                            className="border bg-white text-black border-gray-300 rounded w-full p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <input
                            type="number"
                            placeholder="Сумма"
                            className="border bg-white text-black border-gray-300 rounded w-full p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <button className="bg-blue-600 text-white px-6 py-2 rounded w-full">Снять</button>
                    </div>
                </div>
            </div>
        </div>
    );

}