import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AllResources from '../allResources/allResources';
import CookieClicker from '../../utils/cookieClicker/cookieClicker';
import './mainPage.scss';
import categories from './categories';
import { useSelector } from "react-redux";


const MainPage = () => {
    const countOfAllResources = useSelector((state) => state.resourcesCount.countAllResources);
    const countOfBooks = useSelector((state) => state.resourcesCount.countBooks);
    const websitesCount = useSelector((state) => state.resourcesCount.countWebsites);
    const postsCount = useSelector((state) => state.resourcesCount.countPosts);
    const setCategoriesMenuIsOpen = useSelector(state => state.categoriesMenu.setCategoriesMenuIsOpen);
    const [countOfMainPageCategories, setCountOfMainPageCategories] = useState(4);

    const allCounts = [countOfAllResources, countOfBooks, websitesCount, postsCount];

    const openCategoriesHandler = () => {
        setCategoriesMenuIsOpen(true);
    }

    const getWindowDimensions = () => {
        const { innerWidth: width, innerHeight: height } = window;
        return {
            width,
            height
        };
    };
      
    const useWindowDimensions = () => {
        const [windowDimensions, setWindowDimensions] = useState(
            getWindowDimensions()
        );
        
        useEffect(() => {
            const handleResize = () => {
                setWindowDimensions(getWindowDimensions());
            }
        
        window.addEventListener("resize", handleResize);
            return () => window.removeEventListener("resize", handleResize);
        }, []);
      
        return windowDimensions;
    };

    const { height, width } = useWindowDimensions();

    useEffect(() => {
        if (height <= 920) {
            setCountOfMainPageCategories(3);
        } else if (height === 1024 && width === 768) {
            setCountOfMainPageCategories(3);
        } else if (height === 1180 && width === 820) {
            setCountOfMainPageCategories(3);
        } else {
            setCountOfMainPageCategories(4);
        }
    }, [height, width]);

    return (
        <div className='mainPage-content'>
            <div className='mainPage-content__leftside animate__animated animate__fadeIn'>
                <CookieClicker/>
                <div>
                    <div style={{display: "flex", justifyContent: "space-between", alignItems: "baseline"}}>
                        <h1 className='middleside-bottom-title animate__animated animate__fadeIn'>Categories</h1>
                        <button className='allCategories-button' onClick={openCategoriesHandler}>All</button>
                    </div>
                    {categories.slice(0, countOfMainPageCategories).map((category, index) => 
                        <Link key={Date.now + index} to={category.path}>
                                <div className='links-content__category_name links-content__category'>
                                    {category.name}
                                    <p className='category-resourcesCount animate__animated animate__fadeIn'>{allCounts[index]}</p>
                                </div>
                        </Link>
                    )}
                </div>
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
                        isMainPage={true}
                        />
                </div>
            </div>
        </div>
    )
}

export default MainPage;