import React from 'react';

const Playlist = ({data}) => {
    return (
        <div className={'flex text-white mt-2 p-1 hover:bg-[rgb(47,47,47)] rounded'}>
            {data.images?<img src={data.images[0].url} className={'w-14 h-14 rounded'}/>:
            <div className={'w-14 h-14 rounded bg-[rgb(37,37,37)] p-4'}>
                <svg data-encore-id="icon" role="img" aria-hidden="true" data-testid="playlist"
                     fill={'gray'} className={'w-[24px] h-[24px]'}>
                    <path
                        d="M6 3h15v15.167a3.5 3.5 0 1 1-3.5-3.5H19V5H8v13.167a3.5 3.5 0 1 1-3.5-3.5H6V3zm0 13.667H4.5a1.5 1.5 0 1 0 1.5 1.5v-1.5zm13 0h-1.5a1.5 1.5 0 1 0 1.5 1.5v-1.5z"></path>
                </svg>
            </div>}
            <div className={'pl-3 py-1'}>
                <div>
                    <p className={'text-l w-56 font-bold overflow-hidden text-ellipsis whitespace-nowrap'}>
                        {data.name}
                    </p>
                </div>
                <div>
                    <p className={'text-sm'}>
                        {data.owner.display_name}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Playlist;