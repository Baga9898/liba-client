import React from 'react';
import { Link } from 'react-router-dom';
import AllResources from '../allResources/allResources';
import CookieClicker from '../../utils/cookieClicker/cookieClicker';

import './mainPage.scss';
import categories from './categories';

const MainPage = () => {
    return (
            <div className='mainPage-content'>
                <div className='mainPage-content__leftside animate__animated animate__fadeIn'>
                    <CookieClicker/>
                </div>
                <div className='mainPage-content__middleside'>
                    <h1 className='middleside-top-title animate__animated animate__fadeIn'>Last added</h1>
                        <div className='mainPage-content__middleside_top'>
                            <AllResources 
                                actionSection={false} 
                                itemsToShow={10} 
                                searchInclude={false} 
                                pagination={false} 
                                pageSize={10}
                                fixHeight={false}
                                />
                        </div>
                    <div className='devider animate__animated animate__fadeIn'></div>
                    <div className='mainPage-content__middleside_bottom'>
                        <h1 className='middleside-bottom-title animate__animated animate__fadeIn'>Categories</h1>
                        <div className='links-wrapper animate__animated animate__fadeIn'>
                            {categories.map((category) => 
                                <Link to={category.path} className='links-content'>
                                    {/* <div className='links-content'> */}
                                        <div className='links-content__category_name'>{category.name}</div>
                                    {/* </div> */}
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default MainPage;