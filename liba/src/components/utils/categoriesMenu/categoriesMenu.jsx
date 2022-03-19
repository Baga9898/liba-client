import React from 'react';
import categories from '../../pages/mainPage/categories';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import './categoriesMenu.scss';

const CategoriesMenu = () => {
    const setCategoriesMenuIsOpen = useSelector(state => state.categoriesMenu.setCategoriesMenuIsOpen);

  return (
    <div className='categoriesMenu-overlay animate__animated animate__fadeIn'>
        <button onClick={() => setCategoriesMenuIsOpen(false)} className='categoriesMenu__closeButton'>
			<FontAwesomeIcon icon={faTimes} className='categoriesMenu__closeButton_icon'/>
		</button>
        <div className='container categories-container animate__animated animate__fadeIn'>
          	{categories.map((category, index) => 
          	    <Link key={Date.now + index} to={category.path} onClick={() => setCategoriesMenuIsOpen(false)}>
          	        <div className='links-content__category_name links-content__category categories-mini'>
          	            {category.name}
          	            {/* <p className='category-resourcesCount animate__animated animate__fadeIn'>{allCounts[index]}</p> */}
          	        </div>
          	    </Link>
          	)}
        </div>
    </div>
  )
}

export default CategoriesMenu;