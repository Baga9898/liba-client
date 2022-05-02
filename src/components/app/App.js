import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import CategoriesMenu from '../utils/categoriesMenu/categoriesMenu';
import Header from '../header/header';
import Footer from '../footer/footer';
import routes from './routes';

const App = () => {
	const [categoriesMenuIsOpen, setCategoriesMenuIsOpen] = useState(false);
	const dispatch = useDispatch();

	useEffect(() => {
        dispatch({ type: 'GET_CATEGORIES_MENU_STATUS', payload: categoriesMenuIsOpen });
    }, [categoriesMenuIsOpen, dispatch]);

	useEffect(() => {
        dispatch({ type: 'CHANGE_CATEGORIES_MENU_STATUS', payload: setCategoriesMenuIsOpen });
    }, [setCategoriesMenuIsOpen, dispatch]);

  	return (
  	    <div className='App'>
		  {categoriesMenuIsOpen && <CategoriesMenu/>}
  	      	<Header/>
  	      	<div className='container'>
  	      	  	<Routes>
  	      	  	  	{routes.map((route, index) => <Route key={Date.now + index} path={route.path} element={route.element}/>)}
  	      	  	</Routes>
  	      	</div>
  	      	<Footer/>
  	    </div>
  	);
}

export default App;