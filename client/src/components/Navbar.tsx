import { useState, useEffect } from "react";
import "./Navbar.css";

export default function Navbar(props: any) {
    const imgUrl = new URL('../imgs/logo.png', import.meta.url).href
    const user = props.user;
    const setUser = props.setUser;
    const submissionsCount = props.submissionsCount;
    const handleSetUser = () => {
        console.log('tryina logout')
        setUser(null);
    }
    const total = submissionsCount.active + submissionsCount.inactive
    var perc = 100*submissionsCount.active/total
    if (isNaN(perc)){
        perc = '-'
    }
    return (
        <div className="border-b border-gray-300 bg-dark">
            {user ? <div className="container py-4 mx-auto flex items-center">
                <img src={imgUrl} className='w-32 lg:w-64' alt="logo"/>
                <div className="container flex justify-end">
                    <div className="flex items-center">
                    <div className='flex items-center flex-col px-2 '>
                        <div className='bg-oblue w-12 lg:w-20 text-center rounded-t-md'>
                        <b className='text-xs text-lightblue '>OPEN</b>
                        </div>
                        <div className='bg-midblue w-12 lg:w-20 text-center rounded-b-md'>
                        <p className='text-xs lg:text-3xl'>{submissionsCount.active}</p>
                        </div>
                    </div>
                     <div className='flex items-center flex-col'>
                        <div className='bg-oblue w-12 lg:w-20 text-center rounded-t-md'>
                        <b className='text-xs text-lightblue'>TOTAL</b>
                        </div>
                        <div className='bg-midblue w-12 lg:w-20 text-center rounded-b-md'>
                        <p className='text-xs lg:text-3xl'>{total}</p>
                        </div>
                    </div>
                    <div className='flex items-center flex-col px-2'>
                        <div className='bg-oblue w-12 lg:w-20 text-center rounded-t-md'>
                        <b className='text-xs text-lightblue'>% OPEN</b>
                        </div>
                        <div className='bg-midblue w-12 lg:w-20 text-center rounded-b-md'>
                        <p className='text-xs lg:text-3xl'>{perc}%</p>
                        </div>
                    </div>
                    </div>

                    <nav>
                        <ul className="px-2 lg:px-6 grid grid-rows-2 content-start gap-3">
                        <li className='bg-lightblue w-12 lg:w-24 transition text-center rounded-md'>
                            <h1 className='font-semibold text-xs lg:text-lg'>{user.name}</h1>
                        </li>
                        <li className='flex justify-center items-center bg-red hover:bg-fuchsia-600 w-12 lg:w-24 transition text-center rounded-md'>
                            <a className='font-semibold text-xs text-lightblue' href='#' onClick={handleSetUser}>
                            LOGOUT</a>
                        </li>
                        </ul>
                    </nav>
                </div>
            </div>:
            <div className="justify-center container py-4 mx-auto flex items-center">
                <img src={imgUrl} className='w-32 lg:w-64' alt="logo"/>
            </div>}
        </div>

    );
}