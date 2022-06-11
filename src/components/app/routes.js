import MainPage from '../pages/mainPage/MainPage';
import AllResources from '../pages/allResources/AllResources';
import Websites from '../pages/websites/Websites';
import Books from '../pages/books/Books';
import Posts from '../pages/posts/Posts';
import Soft from '../pages/soft/Soft';

const routes = [
        { path: '/', element: <MainPage/> },
        { path: '/all-resources', element: <AllResources/> },
        { path: '/websites', element: <Websites/> },
        { path: '/books', element: <Books/> },
        { path: '/posts', element: <Posts/> },
        { path: '/soft', element: <Soft/> },
        { path: '*', element: <MainPage/> },
    ]

export default routes;