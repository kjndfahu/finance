import {useTranslations} from "next-intl";

interface Props {
    className?: string;
}

export const HistoryOfDeposits:React.FC<Props> = ({className}) => {
    const t = useTranslations('AccountPersonal')
    const deposits = [
        {
            amount: "200$",
            interestRate: "22%",
            endDate: "23.02.2034",
            status: t('inwork'),
            output: "256$",
            isCompleted: false,
        },
        {
            amount: "200$",
            interestRate: "22%",
            endDate: "23.02.2034",
            status: t('inwork'),
            output: "256$",
            isCompleted: false,
        },
        {
            amount: "200$",
            interestRate: "22%",
            endDate: "23.02.2034",
            status: t('inwork'),
            output: "256$",
            isCompleted: false,
        },
        {
            amount: "200$",
            interestRate: "22%",
            endDate: "23.02.2034",
            status: t('finished'),
            output: "256$",
            isCompleted: true,
        },
    ];

    return (
        <div className="overflow-x-auto bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-4">{t('open-deposits')}</h2>
            <table className="min-w-full table-auto">
                <thead>
                <tr className="text-left  text-[#b0b0b0]">
                    <th className="p-2 font-medium">{t('deposit-amount')}</th>
                    <th className="p-2 font-medium">{t('interest-rate')}</th>
                    <th className="p-2 font-medium">{t('end-date')}</th>
                    <th className="p-2 font-medium">{t('status')}</th>
                    <th className="p-2 font-medium">{t('exit-amount')}</th>
                </tr>
                </thead>
                <tbody>
                {deposits.map((deposit, index) => (
                    <tr key={index} className="border-b">
                        <td className="p-2">{deposit.amount}</td>
                        <td className="p-2 text-green-500">{deposit.interestRate}</td>
                        <td className="p-2">{deposit.endDate}</td>
                        <td className={`p-2 ${deposit.isCompleted ? 'text-red-500' : ''}`}>
                            {deposit.status}
                        </td>
                        <td className="p-2 text-green-500">{deposit.output}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}