import React from 'react';

export default function ({navItems, active, setActive}){
//     navItems = { icon, iconWhite, text }
    return (
        <div className='flex-col space-y-2 w-fit border-r'>
            {
                navItems && navItems.map(item => {
                    if (item.text === active){
                        return <div key={item.text}
                                    className='p-2 m-1 z-10 space-y-1.5 flex flex-col bg-violet-600 text-white items-center' >
                            <img className='w-5' src={item.iconWhite} alt={'icon'} />
                            <div className='text-sm font-medium'>{item.text}</div>
                        </div>
                    }else {
                        return <div key={item.text}
                                    className='p-2 m-1 z-10 space-y-1.5 flex flex-col bg-white text-gray-950 items-center'
                                    onClick={() => {setActive(item.text)}}>
                            <img className='w-5' src={item.icon} alt={'icon'} />
                            <div className='text-sm'>{item.text}</div>
                        </div>
                    }
                })
            }
        </div>
    )
}