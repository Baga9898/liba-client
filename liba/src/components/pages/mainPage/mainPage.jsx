import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AllResources from '../allResources/allResources';

import './mainPage.scss';

const MainPage = () => {
    const [allResources, setAllResources] = useState(
        {
            sections: null,
        }
        );
    
        useEffect(() => {
            const apiUrl = 'https://61c03bd033f24c00178231de.mockapi.io/resources';
            axios.get(apiUrl)
            .then((response) => {
                const allSections = response.data;
                setAllResources({
                sections: allSections
                });
            });
        }, [setAllResources]);

    return (
            <div className='mainPage-content'>
                <div className='mainPage-content__leftside'>
                    leftside section
                </div>
                <div className='mainPage-content__middleside'>
                    {/* TODO: Создать универсальный компонент, принимающий объект с именем секции и ресурсами. */}
                    <h1 className='middleside-top-title'>Last added</h1>
                        <div className='mainPage-content__middleside_top'>
                            {/* TODO: Выгружать заключительные добавленный двадцать ресурсов. */}
                            <AllResources sections={allResources.sections}/>
                        </div>
                    <div className='devider'></div>
                    <div className='mainPage-content__middleside_bottom'>
                        <h1 className='middleside-bottom-title'>Categories</h1>
                        {/* TODO: Создать универсальный компонент. */}
                        {/* TODO: Также перебирать категории из бд. */}
                        <div className='links-wrapper'>
                            <Link to="/all-resources">
                                <div className='links-content'>
                                    <div className='links-content__category_name'>All resources</div>
                                </div>
                            </Link>
                        </div>
                        <div className='links-wrapper'>
                            <Link to="/all-resources">
                                <div className='links-content'>
                                    <div className='links-content__category_name'>Books</div>
                                </div>
                            </Link>
                        </div>
                        <div className='links-wrapper'>
                            <Link to="/all-resources">
                                <div className='links-content'>
                                    <div className='links-content__category_name'>Posts</div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className='mainPage-content__rightside'>
                    rightside section
                </div>
            </div>
    )
}

export default MainPage;