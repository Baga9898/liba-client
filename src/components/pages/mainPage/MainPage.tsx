import { useEffect, useState } from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import AllResources from '../allResources/AllResources';
import CookieClicker from '../../utils/cookieClicker/CookieClicker';
import CategoryType from '../../types/CategoryType';
import categories from './categories';
import './mainPage.scss';


const MainPage: React.FC = () => {
    const countOfAllResources = useSelector((state:RootStateOrAny) => state.resourcesCount.countAllResources || 0);
    const countOfBooks = useSelector((state:RootStateOrAny) => state.resourcesCount.countBooks || 0);
    const websitesCount = useSelector((state:RootStateOrAny) => state.resourcesCount.countWebsites || 0);
    const postsCount = useSelector((state:RootStateOrAny) => state.resourcesCount.countPosts || 0);
    const softsCount = useSelector((state:RootStateOrAny) => state.resourcesCount.countSofts || 0);
    const setCategoriesMenuIsOpen = useSelector((state:RootStateOrAny) => state.categoriesMenu.setCategoriesMenuIsOpen);
    const [countOfMainPageCategories, setCountOfMainPageCategories] = useState(6);

    const allCounts = [countOfAllResources, countOfBooks, websitesCount, postsCount, softsCount];

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
        
        window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }, []);
      
        return windowDimensions;
    };

    const { height, width } = useWindowDimensions();

    useEffect(() => {
        if (width <= 970) {
            setCountOfMainPageCategories(3);
        } else if (height === 1024 && width === 768) {
            setCountOfMainPageCategories(3);
        } else if (height === 1180 && width === 820) {
            setCountOfMainPageCategories(3);
        } else {
            setCountOfMainPageCategories(6);
        }
    }, [height, width]);

    return (
        <div className='mainPage-content'>
            <div className='mainPage-content__leftside animate__animated animate__fadeIn'>
                <CookieClicker/>
                <div className='mainpage-categories-wrapper'>
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}>
                        <h1 className='middleside-bottom-title animate__animated animate__fadeIn'>Categories</h1>
                        <button className='allCategories-button' onClick={openCategoriesHandler}>All</button>
                    </div>
                    <div className='mainpage-categories-wrapper__items'>
                        {categories.slice(0, countOfMainPageCategories).map((category: CategoryType, index: number) => 
                            <Link key={`${category}_${index}`} to={category.path}>
                                    <div className='links-content__category_name links-content__category'>
                                        {category.name}
                                        <p className='category-resourcesCount animate__animated animate__fadeIn'>{allCounts[index]}</p>
                                    </div>
                            </Link>
                        )}
                    </div>
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