import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Preloader from '../../preloader/preloader';


const Books = () => {
    const [booksResources, setBooksResources] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const baseURL = "https://61c03bd033f24c00178231de.mockapi.io/resources";

    useEffect(() => {
        axios.get(baseURL, {params: {category: "books"}})
            .then((response) => {
            setBooksResources(response.data);
            setIsLoading(false);
        });
    }, []);

    if (!booksResources || booksResources.length === 0) return (
            <div>{isLoading ? <Preloader/> : <p className='oops'>Oops, there's nothing<br/>here yet</p>}</div>
        )

    return (
        <div className='allResources__wrapper'>
            {
                booksResources.map((resource) =>
                    <div key={resource.id} className='section__wrapper'>
                        <div className='section__leftside'>
                            <div className='section__leftside_top'>
                                <div className='section__leftside_name'>{resource.name}</div>
                                <div className='section__leftside_link'>{resource.link}</div>
                            </div>
                            <div className='section__leftside_down'>
                                <div className='section__leftside_date'>{resource.date}</div>
                            </div>
                        </div>
                        <div className='section__rightside'>
                            <div className='section__rightside_category'>{resource.category}</div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default Books;