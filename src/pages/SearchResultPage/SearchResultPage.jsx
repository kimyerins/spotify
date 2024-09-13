import React from 'react';
import { useParams } from 'react-router-dom';
import { useSearchQuery } from '../../hooks/useSearch';
import RoundInfoCard from '../../common/InfoCard/RoundInfoCard';
import ChartItem from '../../common/ChartItem';

const categoryTranslations = {
    albums: "앨범",
    artists: "아티스트",
    playlists: "플레이리스트",
    tracks: "곡"
};

const SearchResultPage = () => {
    const { keyword } = useParams();
    // 검색 결과
    const { data: results, isLoading, isError, error } = useSearchQuery(keyword);

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error: {error.message}</p>;

    return (
        <div className='flex flex-col w-full gap-7'>
            <div className='flex justify-start text-sm'>
                <button className='h-8 px-4 bg-[rgb(37,37,37)] rounded-full text-white mx-1 hover:bg-[rgb(48,48,48)]'>모두</button>
                {results && Object.keys(results).map((category) => (
                    <button
                        key={category}
                        className={'h-8 px-4 bg-[rgb(37,37,37)] rounded-full text-white mx-1 hover:bg-[rgb(48,48,48)]'}
                    >
                        {categoryTranslations[category] || category}
                    </button>
                ))}
            </div>
            <div className='flex gap-4 w-full mt-6 lg:flex-row flex-col '>
                <div className='lg:w-1/2 w-full'>
                    <h2 className='text-2xl mb-2 text-white font-bold'>상위 결과</h2>
                    <div className='h-56 p-5 bg-[#181818] cursor-pointer hover:bg-[#1f1f1f] rounded-[6px] group transition-all duration-300 ease-in-out '>
                        <img className='overflow-hidden rounded-full w-24 h-24 mb-5' loading="lazy" src={results?.artists[0].images[0].url} alt="" />
                        <div className={'relative'}>
                            <span className={'block mb-1 text-4xl text-white font-bold'}>{results?.artists[0].name}</span>
                            <span className={'text-sm text-[#b3b3b3]'}>{categoryTranslations[results?.artists[0].type + 's'] || results?.artists[0].type}</span>
                            <div className={'absolute bottom-2 right-2 transform translate-y-2 opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100 z-10'}>
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
                    </div>
                </div>
                <div className='lg:w-1/2 w-full'>
                    <h2 className='text-2xl mb-2 text-white font-bold'>곡</h2>
                    <div>
                        {results.tracks.slice(0, 4).map((song, index) => (
                            <ChartItem type="search" item={song} key={index}/>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SearchResultPage;
