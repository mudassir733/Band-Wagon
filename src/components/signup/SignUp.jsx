import React from 'react'
import { CiUser } from "react-icons/ci";
import { MdOutlineMail } from "react-icons/md";
import { CiLock } from "react-icons/ci";

const SignUp = () => {
  return (
   <div className='w-full h-screen bg-background pl-[137px]'>
<div className='grid grid-cols-2 gap-[141px]'>
<div className="w-[590px] h-screen bg-black flex items-center justify-center">
<div className="h-[258px] flex-col justify-start items-center gap-10 inline-flex">
    <div className="flex-col justify-start items-center gap-8 flex">
        <h1 className="text-white text-[52px] font-bold font-['Lato'] leading-[44px]">Welcome back</h1>
        <p className="w-[370px] text-center text-neutral-400 text-[28px] font-medium font-['Lato'] leading-[34px]">It is a long established fact that a reader will be distracted by the readable.</p>
    </div>
    <div className="w-[121px] px-6 py-2.5 bg-[#1ed760] rounded-[100px] justify-center items-center gap-2.5 inline-flex">
        <div className="text-center text-black text-sm font-medium font-['Lato'] leading-tight tracking-tight">Sign in</div>
    </div>
</div>
</div>
<div className='flex items-center'>
<div className="h-[520px] flex-col justify-center items-center gap-6 inline-flex">
    <div className="flex-col justify-center items-center gap-6 flex">
        <div className="flex-col justify-center items-start gap-9 flex">
            <div className="flex-col justify-start items-center gap-9 flex">
                <div className="text-white text-4xl font-bold font-['Lato'] leading-[44px]">Create an account</div>
                <div className="flex-col justify-start items-start gap-3.5 flex">
                    <div className="w-[328px] h-10 px-3.5 py-2.5 rounded-[100px] border border-[#272727] justify-start items-center gap-2 inline-flex">
                        <div className="w-6 h-6 relative">
                            <CiUser className='w-6 h-6 left-0 top-0 absolute text-neutral-500' />
                        </div>
                        <div className="justify-center items-center gap-2 flex w-full">
                            <div className="justify-center items-center gap-2 flex w-full">
                                <div className="text-neutral-500 w-full text-sm font-medium font-['Inter'] leading-tight">
                                    <input type="text" placeholder='Username' className='w-full h-10  py-2.5 justify-start items-center gap-2 inline-flex bg-transparent outline-none placeholder:text-neutral-500 font-regular' />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-[328px] h-10 px-3.5 py-2.5 rounded-[100px] border border-[#272727] justify-start items-center gap-2 inline-flex">
                        <div className="w-6 h-6 relative">
                            <MdOutlineMail  className='w-6 h-6 left-0 top-0 absolute text-neutral-500' />
                        </div>
                        <div className="justify-center items-center gap-2 flex w-full">
                            <div className="justify-center items-center gap-2 flex w-full">
                                <div className="text-neutral-500 text-sm font-medium font-['Inter'] leading-tight w-full">
                                    <input type="text" placeholder='Email' className='w-full h-10  py-2.5 justify-start items-center gap-2 inline-flex bg-transparent outline-none placeholder:text-neutral-500 font-regular' />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-[328px] h-10 px-3.5 py-2.5 rounded-[100px] border border-[#272727] justify-start items-center gap-2 inline-flex">
                        <div className="w-6 h-6 relative">
                            <CiLock className='w-6 h-6 left-0 top-0 absolute text-neutral-500' />
                        </div>
                        <div className="justify-center items-center gap-2 flex w-full">
                            <div className="justify-center items-center gap-2 flex w-full">
                                <div className="text-neutral-500 text-sm font-medium font-['Inter'] leading-tight w-full">
                                    <input type="password" placeholder='Password' className='w-full h-10  py-2.5 justify-start items-center gap-2 inline-flex bg-transparent outline-none placeholder:text-neutral-500 font-regular' />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-[328px] px-6 py-2.5 bg-[#1ed760] rounded-[100px] justify-center items-center gap-2.5 inline-flex">
                <div className="text-center text-[#040303] text-sm font-medium font-['Lato'] leading-tight tracking-tight">Sign Up</div>
            </div>
        </div>
        <div className="justify-start items-center gap-3 inline-flex">
            <div className="w-[145px] h-[0px] border border-neutral-700"></div>
            <div className="text-center text-white text-sm font-medium font-['Lato'] leading-tight">or</div>
            <div className="w-[145px] h-[0px] border border-neutral-700"></div>
        </div>
    </div>
    <div className="flex-col justify-start items-start gap-3.5 flex">
        <div className="w-[328px] h-10 px-6 py-2.5 bg-white rounded-[100px] justify-center items-center gap-2.5 inline-flex">
            <div className="justify-center items-center gap-2 flex">
                <div className="w-[18px] h-[18px] relative">
                </div>
                <div className="text-neutral-700 text-sm font-medium font-['Lato'] leading-tight">Sign up with Google</div>
            </div>
        </div>
        <div className="w-[328px] h-10 px-6 py-2.5 bg-[#3c5a9a] rounded-[100px] justify-center items-center gap-2.5 inline-flex">
            <div className="justify-center items-center gap-2 flex">
                <div className="justify-center items-center gap-2 flex">
                    <div className="w-[18px] h-[18px] relative">
                        <div className="w-[18px] h-[18px] left-0 top-[18px] absolute">
                        </div>
                    </div>
                    <div className="text-[#fff6f6] text-sm font-medium font-['Lato'] leading-tight">Sign up with Facebook</div>
                </div>
            </div>
        </div>
        <div className="w-[328px] h-10 px-6 py-2.5 bg-black rounded-[100px] justify-center items-center gap-2.5 inline-flex">
            <div className="justify-center items-center gap-2 flex">
                <div className="w-6 h-6 relative" />
                <div className="justify-center items-center gap-2 flex">
                    <div className="justify-center items-center gap-2 flex">
                        <div className="text-white text-sm font-medium font-['Lato'] leading-tight">Sign up with Apple</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</div>
</div>
   </div>
  )
}

export default SignUp