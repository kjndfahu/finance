import abstract from '../../../assets/abstract.png'
import Image from 'next/image'
import Link from "next/link";

interface Props{
    className?:string;
}

export const AboutImage:React.FC<Props> = ({className}) => {
    return(
        <div className="flex flex-col justify-center w-full mdbvp:h-[600px] md:h-[300px] rounded-[30px] bg-cover bg-center bg-[url('https://raison.app/_nuxt/img/human.941d674.jpg')]">
            <div className="flex flex-col justify-center mdbvp:mx-[100px] md:mx-[40px] md:my-0 my-5 mx-[20px] mdbvp:w-[570px] md:w-[300px] w-[200px] md:gap-5 gap-2">
                <h1 className="mdbvp:text-[56px] md:text-[32px] text-[25px] leading-[25px] mdbvp:leading-[55px] md:leading-[32px] font-semibold">Family Office<br/> in Your Pocket</h1>
                <h3 className="mdbvp:text-[22px] md:text-[20px] text-[13px] leading-[13px] md:leading-[22px] mdbvp:leading-[27px]">Comprehensive solutions, from launching an investment path to
                    growing the existing wealth.</h3>
                <Link href={`/en/registration`}>
                    <div
                        className="flex md:text-[15px] text-[10px] items-center bg-[#15B0DB] md:w-[190px] w-[100px] rounded-[10px] py-1 md:px-7 px-1 font-semibold justify-center text-white">Get
                        a free account
                    </div>
                </Link>
            </div>
        </div>
    )
}