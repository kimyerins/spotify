import React from 'react'

const SquareInfoCard = () => {
  return (
    <div className={'aaa p-3 hover:bg-[#1f1f1f] rounded-[6px] group transition-all duration-200 ease-in-out '}>
        <div className={'mb-2 relative'}>
            <img className={'overflow-hidden rounded-[6px]'} loading="lazy" src="https://i.scdn.co/image/ab67616d00001e0286ed11a147dbe7eaa9ca31dd" alt="" />
            <div className={'bbb absolute bottom-2 right-2 transform translate-y-2 opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100'}>
                <span
                    className={"bg-[#1ed760] w-12 h-12 flex items-center justify-center rounded-full hover:bg-[#3be477] cursor-pointer"}
                    style={{ boxShadow: '0 8px 8px rgba(0, 0, 0, 0.3)' }}
                >
                    <svg
                        role="img"
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        className="w-6 h-6 text-[#000000]"  // SVG 크기와 색상 설정
                        fill="currentColor"
                    >
                        <path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z"></path>
                    </svg>
                </span>
            </div>
        </div>
        <div>
            <span className={'block mb-1 text-sm font-bold'}>Armageddon - The 1st Album</span>
            <span className={'text-sm text-[#b3b3b3]'}>2024 • 앨범</span>
        </div>
    </div>
  )
}

export default SquareInfoCard
