import React from 'react';
import Headlines from './Headlines';

const ScienceNews = () => {
  return (
    <div>
        <Headlines url={"https://newsapi.org/v2/top-headlines?country=in&category=science&apiKey=103a1879ea8a49aa924f080c8d82cc58"} />
    </div>
  )
}

export default ScienceNews