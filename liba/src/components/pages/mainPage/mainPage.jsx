import React from 'react';
import { Link } from 'react-router-dom';
import AllResources from '../allResources/allResources';
import CookieClicker from '../../utils/cookieClicker/cookieClicker';

import './mainPage.scss';

const MainPage = () => {
    return (
            <div className='mainPage-content'>
                <div className='mainPage-content__leftside'>
                    <CookieClicker/>
                </div>
                <div className='mainPage-content__middleside'>
                    {/* TODO: Создать универсальный компонент, принимающий объект с именем секции и ресурсами. */}
                    <h1 className='middleside-top-title'>Last added</h1>
                        <div className='mainPage-content__middleside_top'>
                            <AllResources actionSection={false} itemsToShow={10} searchInclude={false}/>
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
                            <Link to="/websites">
                                <div className='links-content'>
                                    <div className='links-content__category_name'>Websites</div>
                                </div>
                            </Link>
                        </div>
                        <div className='links-wrapper'>
                            <Link to="/books">
                                <div className='links-content'>
                                    <div className='links-content__category_name'>Books</div>
                                </div>
                            </Link>
                        </div>
                        <div className='links-wrapper'>
                            <Link to="/posts">
                                <div className='links-content'>
                                    <div className='links-content__category_name'>Posts</div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
                {/* <div className='mainPage-content__rightside'>
                    rightside section
                </div> */}
            </div>
    )
}

export default MainPage;