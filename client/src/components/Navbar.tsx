export default function Navbar(props: any) {
    //const imgUrl = new URL('../imgs/logo.png', import.meta.url).href
    const imgUrl = new URL('../imgs/logo_new.png', import.meta.url).href
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
        perc = '--'
    }
    return (
        <div className="font-mono border-b border-gray-300 bg-white">
            {user ? <div className="container p-4 mx-auto flex items-center">
                <img src={imgUrl} className='w-24 lg:w-96' alt="logo"/>
                <div className="flex container justify-end">
                    <div className="flex">
                    <div className='flex-col px-2'>
                        <div className='bg-crossmaskblue border-t border-l border-r border-gray-500 w-8 lg:w-24 text-center rounded-t'>
                        <p className='text-xs lg:text-lg text-lightblue '>OPEN</p>
                        </div>
                        <div className='bg-white border-b border-l border-r border-gray-400 w-8 lg:w-24 text-center rounded-b lg:p-1'>
                        <p className='text-xs lg:text-3xl'>{submissionsCount.active}</p>
                        </div>
                    </div>
                     <div className='flex-col'>
                        <div className='bg-crossmaskblue border-t border-l border-r border-gray-500 w-8 lg:w-24 text-center rounded-t'>
                        <p className='text-xs lg:text-lg text-lightblue'>TOTAL</p>
                        </div>
                        <div className='bg-white border-b border-l border-r border-gray-400 w-8 lg:w-24 text-center rounded-b lg:p-1'>
                        <p className='text-xs lg:text-3xl'>{total}</p>
                        </div>
                    </div>
                    <div className='flex-col px-2'>
                        <div className='text-center bg-crossmaskblue border-t border-l border-r border-gray-500 w-12 lg:w-24 text-center rounded-t'>
                        <p className='text-xs lg:text-lg text-lightblue'>% OPEN</p>
                        </div>
                        <div className='bg-white border-b border-l border-r border-gray-400 w-12 lg:w-24 text-center rounded-b lg:p-1'>
                        <p className='text-xs lg:text-3xl'>{perc}%</p>
                        </div>
                    </div>
                    </div>

                    <nav>
                        <div className="flex items-center justify-center px-2 lg:px-6 flex-col lg:gap-3">
                            <p className='text-crossmaskblue font-semibold text-xs lg:text-lg'>{user.name}</p>
                            <a className='text-xs lg:text-lg underline font-semibold text-red-500 text-center hover:text-black transition' href='#' onClick={handleSetUser}>LOGOUT</a>
                        </div>
                    </nav>
                </div>
            </div>:
            <div className="justify-center container py-4 mx-auto flex items-center">
                <img src={imgUrl} className='w-32 lg:w-64' alt="logo"/>
            </div>}
        </div>

    );
}