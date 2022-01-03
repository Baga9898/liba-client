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
                    <h1 className='middleside-top-title'>Latest resources</h1>
                        <div className='mainPage-content__middleside_top'>
                            {/* TODO: Выгружать заключительные добавленный двадцать ресурсов. */}
                            <AllResources sections={allResources.sections}/>
                        </div>
                    <div className='devider'></div>
                    <div className='mainPage-content__middleside_bottom'>
                        {/* TODO: Создать универсальный компонент. */}
                        
                        <Link to="/all-resources">all</Link>
                    </div>
                </div>
                <div className='mainPage-content__rightside'>
                    rightside section
                </div>
            </div>
    )
}

export default MainPage;