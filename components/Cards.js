import React from 'react';
import SingleCard from './SingleCard';

const Cards = ({ blogData, loading }) => {
    return (
        <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {!loading ? (
                blogData?.map((data) => (
                    <SingleCard key={data._id} data={data} />
                ))
            ) : (
                "loading..."
            )}
        </div>
    );
};

export default Cards;