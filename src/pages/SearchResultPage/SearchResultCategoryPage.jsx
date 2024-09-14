import React from 'react'
import { useParams } from 'react-router-dom'

const SearchResultCategoryPage = () => {
    // keyword, category
    const query = useParams();

    const categoryTranslations = {
        albums: "앨범",
        artists: "아티스트",
        playlists: "플레이리스트",
        tracks: "곡"
    };

    return (
        <div className='w-full'>
            <h2 className='text-2xl mb-2 text-white font-bold'>{categoryTranslations[query.category] || query.category}</h2>
            <div className='flex overflow-hidden'>
                <div className='flex flex-nowrap gap-4'>
                    {items.map((item, index) => (
                        <Card
                            key={index}
                            title={item.name}
                            subTitle={type}
                            imgUrl={item.images[0]?.url}
                        />
                    ))}
                </div>
            </div>
        </div>

    )
}

export default SearchResultCategoryPage