import Card from '../../../common/Card';
import React from 'react'

const Section = ({type, items, count}) => {
  return (
    <div className='w-full'>
      <h2 className='text-2xl mb-2 text-white font-bold'>{type}</h2>
      <div className='flex overflow-hidden'>
        <div className='flex flex-nowrap gap-4'>
          {items.slice(0, count).map((item, index) => (
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

export default Section