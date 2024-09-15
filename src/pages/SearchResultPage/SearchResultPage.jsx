import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSearchQuery } from '../../hooks/useSearch';
import ChartItem from '../../common/ChartItem';
import Section from './Components/Section';

const categoryTranslations = {
    albums: "앨범",
    artists: "아티스트",
    playlists: "플레이리스트",
    tracks: "곡"
};

const SearchResultPage = () => {
    const { keyword } = useParams();
    const { data: results, isLoading, isError, error } = useSearchQuery(keyword);
    const [category, setCategory] = useState('all');
    const [count, setCount] = useState(0);
    const navigate = useNavigate();

    // 화면 크기에 따라 카드 갯수 변경
    const handleResize = () => {
        const width = window.innerWidth;
        if (width <= 1300) {
            setCount(2);
        } else if (width <= 1500) {
            setCount(3);
        } else if (width <= 1700) {
            setCount(4);
        } else if (width <= 1900) {
            setCount(5);
        } else {
            setCount(6);
        }
    };

    // 화면 크기 변화 감지
    useEffect(() => {
        handleResize(); // 컴포넌트 마운트 시 초기화
        window.addEventListener('resize', handleResize); // 윈도우 리사이즈 시 이벤트 감지
        return () => window.removeEventListener('resize', handleResize); // 컴포넌트 언마운트 시 이벤트 제거
    }, []);

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error: {error.message}</p>;

    // 검색 결과가 없는 경우 처리
    const isEmptyResults =
        !results || (Object.keys(results).length === 0 || (
            !results.artists?.length &&
            !results.tracks?.length &&
            !results.albums?.length &&
            !results.playlists?.length
        ));

    // 버튼 클릭 시 카테고리 상태 업데이트
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

                    {/* 상위 결과 섹션 */}
                    <div className='flex gap-4 w-full mt-6 flex-row max-[1300px]:flex-col '>
                        <div className='w-1/2 max-[1300px]:w-full'>
                            <h2 className='text-2xl mb-2 text-white font-bold'>상위 결과</h2>
                            <Link to={`/detail/artist/${results?.artists[0]?.id}`}>
                                <div className='h-56 p-5 bg-[#181818] cursor-pointer hover:bg-[#1f1f1f] rounded-[6px] group transition-all duration-300 ease-in-out'>
                                    <img className='overflow-hidden rounded-full w-24 h-24 mb-5' loading="lazy" src={results?.artists[0]?.images[0]?.url} alt="" />
                                    <div className={'relative'}>
                                        <span className={'block mb-1 text-4xl text-white font-bold'}>{results?.artists[0]?.name}</span>
                                        <span className={'text-sm text-[#b3b3b3]'}>{categoryTranslations[results?.artists[0]?.type + 's'] || results?.artists[0]?.type}</span>
                                        <div className={'absolute bottom-2 right-2 transform translate-y-2 opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100 z-10'}>
                                            <span
                                                className={"bg-[#1ed760] w-12 h-12 flex items-center justify-center rounded-full hover:bg-[#3be477] cursor-pointer"}
                                                style={{ boxShadow: '0 8px 8px rgba(0, 0, 0, 0.3)' }}
                                            >
                                                <svg
                                                    role="img"
                                                    aria-hidden="true"
                                                    viewBox="0 0 24 24"
                                                    className="w-6 h-6 text-[#000000]"
                                                    fill="currentColor"
                                                >
                                                    <path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z"></path>
                                                </svg>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        <div className='w-1/2 max-[1300px]:w-full'>
                            <h2 className='text-2xl mb-2 text-white font-bold'>곡</h2>
                            <div>
                                {results.tracks.slice(0, 4).map((song, index) => (
                                    <ChartItem type="search" item={song} key={index} />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* 아티스트 섹션 */}
                    <Section type='artist' items={results?.artists} count={count} />

                    {/* 앨범 섹션 */}
                    <Section type='album' items={results?.albums} count={count} />

                    {/* 플레이리스트 섹션 */}
                    <Section type='playlist' items={results?.playlists} count={count} />
                </>
            )}
        </div>
    );
};

export default SearchResultPage;
