import abstract from '../../../assets/abstract.png'
import Image from 'next/image'
import Link from "next/link";

interface Props{
    className?:string;
}

export const AboutImage:React.FC<Props> = ({className}) => {
    return(
        <div className="flex flex-col  justify-center w-full h-[600px] rounded-[30px] bg-[url('https://raison.app/_nuxt/img/human.941d674.jpg')]">
            <div className="flex flex-col justify-center mx-[100px] w-[570px] gap-5">
                <h1 className="text-[56px] leading-[55px] font-semibold">Family Office<br/> in Your Pocket</h1>
                <h3 className="text-[22px] leading-[27px]">Comprehensive solutions, from launching an investment path to
                    growing the existing wealth.</h3>
                <Link href={`/en/registration`}>
                    <div
                        className="flex items-center bg-[#15B0DB] w-[190px] rounded-[10px] py-1 px-7 font-semibold justify-center text-white">Get
                        a free account
                    </div>
                </Link>
            </div>
        </div>
    )
}