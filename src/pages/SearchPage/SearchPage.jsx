import React from 'react'
import RectangleCard from '../../common/RectangleCard'

const SearchPage = () => {

    const examGenre = "코미디"
    const examCardImgSrc = "https://i.scdn.co/image/ab67fb8200005caf1ddb6ff66a34c4c681548f66";

    return (
        <div className='w-full h-fit flex flex-col text-white bg-[#121212] p-4 m=1 rounded-lg'>
            <h2 className='h-[60px] flex font-bold text-2xl items-center mt-8'>모두 둘러보기</h2>
            <div className='grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6'>
                {Array(8).fill(
                    <RectangleCard genre={examGenre} imgSrc={examCardImgSrc} />
                )}
            </div>
        </div>
    )
}

export default SearchPage