import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSearchQuery } from '../../hooks/useSearch';
import Card from '../../common/Card';

const SearchResultCategoryPage = () => {
    const query = useParams();
    const keyword = query.keyword;

    const categoryTranslations = {
        albums: "앨범",
        artists: "아티스트",
        playlists: "플레이리스트",
        tracks: "곡"
    };

    const { data: results, isLoading, isError, error } = useSearchQuery(keyword, 30);

    const [category, setCategory] = useState(query.category);
    const navigate = useNavigate();

    // 검색 결과가 없는 경우
    const isEmptyResults =
        !results || (Object.keys(results).length === 0 || (
            !results.artists?.length &&
            !results.tracks?.length &&
            !results.albums?.length &&
            !results.playlists?.length
        ));

    // Hook 호출 순서를 지키기 위해 렌더링 외부로 처리
    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error: {error.message}</p>;

    // 카테고리 변경 핸들러
    const handleCategoryChange = (newCategory) => {
        setCategory(newCategory);
        if (newCategory === 'all') navigate(`/search/${keyword}`);
        else navigate(`/search/${keyword}/${newCategory}`);
    };

    return (
        <div className='flex flex-col w-full gap-7'>
            {isEmptyResults ? (
                <div className="text-center text-white mt-52">
                    <h2 className="text-3xl font-bold mb-4">"{keyword}"과(와) 일치하는 결과 없음</h2>
                    <p>입력한 단어의 철자가 맞는지 확인하거나 짧은 키워드 또는 다른 키워드를 사용하세요.</p>
                </div>
            ) : (
                <>
                    <div className='flex justify-start text-sm overflow-x-auto scrollbar-hide'>
                        <button
                            onClick={() => handleCategoryChange('all')}
                            className={`inline-flex items-center justify-center h-8 px-4 rounded-full mx-1 whitespace-nowrap ${category === 'all' ? 'bg-white text-black' : 'bg-[rgb(37,37,37)] text-white hover:bg-[rgb(48,48,48)]'
                                }`}
                        >
                            모두
                        </button>
                        {results && Object.keys(results).map((cat) => (
                            <button
                                key={cat}
                                onClick={() => handleCategoryChange(cat)}
                                className={`inline-flex items-center justify-center h-8 px-4 rounded-full mx-1 whitespace-nowrap ${category === cat ? 'bg-white text-black' : 'bg-[rgb(37,37,37)] text-white hover:bg-[rgb(48,48,48)]'
                                    }`}
                            >
                                {categoryTranslations[cat] || cat}
                            </button>
                        ))}
                    </div>

                    <div className='w-full'>
                        <h2 className='text-2xl mb-2 text-white font-bold'>{categoryTranslations[query.category] || query.category}</h2>
                        <div className='flex overflow-hidden'>
                            <div className='grid gap-4 grid-cols-2 xl:grid-cols-3 min-[1500px]:grid-cols-4 min-[1660px]:grid-cols-5 min-[1820px]:grid-cols-6'>
                                {results?.[category]?.length > 0 ? (
                                    results[category].map((item, index) => (
                                        <Card
                                            key={index}
                                            title={item.name}
                                            subTitle={categoryTranslations[category]}
                                            imgUrl={category === 'tracks' ? item.album.images?.[0]?.url : item.images?.[0]?.url}
                                            imgShape={category === 'artists' ? 'circle' : ''}
                                            url={`detail/${category.slice(0,-1)}/${item.id}`}
                                        />
                                    ))
                                ) : (
                                    <p>No results found for {category}</p>  // 데이터가 없는 경우
                                )}

                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default SearchResultCategoryPage;
