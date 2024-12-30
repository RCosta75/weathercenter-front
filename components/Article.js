import React from 'react';


function Article(props) {

    

    return (
        <div className='w-5/6 rounded-lg border border-stone-300 bg-stone-100 cursor-pointer' onClick={() => window.open(props.url, '_blank')}>
            <h1>{props.title}</h1>
            <img src={props.image} />
        </div>
    );
}

export default Article;