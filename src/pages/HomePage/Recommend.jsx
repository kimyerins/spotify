import React from 'react';
import Card from "../../common/Card.jsx";
import {useRecommendTrack} from "../../hooks/useRecomendTracks.js";;

const Recommend = ({data}) => {
    const {data:recommend,isLoading} = useRecommendTrack(data)

    const getRandom = (recommend) => {
        if (!recommend || recommend.length === 0) return [];

        // 배열을 랜덤하게 섞음
        const shuffled = recommend.sort(() => 0.5 - Math.random());
        // 앞에서 10개를 선택
        return shuffled.slice(0, 10);
    };

    if(isLoading){
        return '';
    }

    const randomRecommend = getRandom(recommend);
    console.log('randomTrack',randomRecommend);
    return (
        <div className={'mt-10'}>
            <h1>
                {`오늘의 추천장르!! ${data.toUpperCase()}`}
            </h1>
            <div className={'grid grid-cols-[repeat(auto-fit,minmax(165px,1fr))] gap-1'}>
                {recommend && randomRecommend.map((item, index)=>(
                    <Card
                        key={index}
                        title={item.name}
                        subTitle={item.artists[0]?.name}
                        imgUrl={item.album.images[item.album.images.length-2]?.url}/>
                ))}
            </div>
        </div>
    );
};

export default Recommend;