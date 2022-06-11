import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import CategoriesMenu from '../utils/categoriesMenu/CategoriesMenu';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import routes from './routes';

type routeType ={
    path: string,
    element: JSX.Element,
}

const App: React.FC = () => {
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
  	      	  	  	{routes.map((route: routeType, index: number) => <Route key={`${route}_${index}`} path={route.path} element={route.element}/>)}
  	      	  	</Routes>
  	      	</div>
  	      	<Footer/>
  	    </div>
  	);
}

export default App;