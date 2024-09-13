import React from 'react';
import {useArtists} from "../../hooks/useArtists.js";
import Card from "../../common/Card.jsx";

const Recommend = (item) => {


    const {data} = useArtists(item.data)

    console.log('item',data);
    return (
        <div className={'mt-10'}>
            <h1>
                {`오늘의 추천 아티스트!!`}
            </h1>
            <div className={'grid grid-cols-[repeat(auto-fit,minmax(165px,1fr))] gap-1'}>
                {data && data.map((item,index)=>(
                    <Card
                        key={index}
                        title={item.name}
                        subTitle={'아티스트'}
                        imgUrl={item.images[item.images.length-2]?.url}
                        imgShape={'circle'}
                    />
                ))}
            </div>
        </div>
    );
};

export default Recommend;