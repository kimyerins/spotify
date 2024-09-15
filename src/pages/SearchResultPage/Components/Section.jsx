import Card from '../../../common/Card';
import React from 'react'

const Section = ({ type, items, count }) => {
  return (
    <div className='w-full'>
      <h2 className='text-2xl mb-2 text-white font-bold'>{type === 'artist' ? '아티스트' : type == 'album' ? '앨범' : '플레이리스트'}</h2>
      <div className='flex overflow-hidden'>
        <div className='flex flex-nowrap gap-4'>
          {items.slice(0, count).map((item, index) => (
            <Card
              key={index}
              title={item.name}
              subTitle={type}
              imgUrl={item.images[0]?.url}
              imgShape={type === 'artist' ? 'circle' : ''}
              url = {`detail/${type}/${item?.id}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Section