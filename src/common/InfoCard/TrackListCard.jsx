import React from 'react'

const TrackListCard = () => {
  return (
    <div className={'px-4 py-2 h-14 flex gap-x-4 overflow-hidden rounded-[4px] group hover:bg-[hsla(0,0%,100%,.1)] transition-all duration-200 ease-in-out'}>
        <div className={'flex items-center justify-center'}>
            <span className={'text-[#b3b3b3] font-bold'}>1</span>
        </div>
        <div className={'w-[70%] flex items-center justify-start'}>
            <img className={'overflow-hidden rounded-[4px] h-full mr-3'} loading="lazy" src="https://i.scdn.co/image/ab67616d00001e020fc598038040859794c600e2" alt="" />
            <span className={'font-bold'}>Supernova</span>
        </div>
        <div className={'w-[20%] flex items-center justify-start'}>
            <p className={'text-[#b3b3b3] group-hover:text-[#fff]'}>166,701,761</p>
        </div>
        <div className={'w-[10%] flex items-center justify-end'}>
            <div className={'mr-6'}>
                <svg
                    data-encore-id="icon"
                    role="img"
                    aria-hidden="true"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className={"w-4 h-4 text-[#b3b3b3] hover:text-white transition-all duration-250 ease-in-out"}
                >
                    <path d="M1.69 2A4.582 4.582 0 0 1 8 2.023 4.583 4.583 0 0 1 11.88.817h.002a4.618 4.618 0 0 1 3.782 3.65v.003a4.543 4.543 0 0 1-1.011 3.84L9.35 14.629a1.765 1.765 0 0 1-2.093.464 1.762 1.762 0 0 1-.605-.463L1.348 8.309A4.582 4.582 0 0 1 1.689 2zm3.158.252A3.082 3.082 0 0 0 2.49 7.337l.005.005L7.8 13.664a.264.264 0 0 0 .311.069.262.262 0 0 0 .09-.069l5.312-6.33a3.043 3.043 0 0 0 .68-2.573 3.118 3.118 0 0 0-2.551-2.463 3.079 3.079 0 0 0-2.612.816l-.007.007a1.501 1.501 0 0 1-2.045 0l-.009-.008a3.082 3.082 0 0 0-2.121-.861z"></path>
                </svg>
            </div>
            <span className={'mr-3 text-[#b3b3b3]'}>2:58</span>
            <div>
                <svg
                    data-encore-id="icon"
                    role="img"
                    aria-hidden="true"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className={'w-4 h-4 text-[#b3b3b3] hover:text-white transition-all duration-250 ease-in-out'}
                >
                    <path d="M3 8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm6.5 0a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zM16 8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"></path>
                </svg>
            </div>
        </div>
    </div>
  )
}

export default TrackListCard
