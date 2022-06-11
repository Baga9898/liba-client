import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import CategoryComponent from '../../utils/categoryComponent/CategoryComponent';
import { useDispatch } from 'react-redux';

type AllResourcesType = {
    actionSection: boolean;
    itemsToShow: number,
    searchInclude: boolean,
    pagination: boolean,
    pageSize: number,
    isMainPage: boolean,
}

const AllResources: React.FC<AllResourcesType> = ({ actionSection=true, itemsToShow, searchInclude=true, pagination=true, pageSize, isMainPage=false }) => {
    const categoryName = 'All resources';
    const baseURL = 'https://61c03bd033f24c00178231de.mockapi.io/resources';
    const [countOfResources, setCountOfResources] = useState(null);
    const [countOfBooksResources, setCountOfBooksResources] = useState(null);
    const [countOfWebsitesResources, setCountOfWebsitesResources] = useState(null);
    const [countOfPostsResources, setCountOfPostsResources] = useState(null);
    const [countOfSoftsResources, setCountOfSoftsResources] = useState(null);
    const dispatch = useDispatch();

    useMemo(() => {
        axios.get(baseURL)
        .then((response) => {
            setCountOfResources(response.data.length);
        })
    }, []);

    useEffect(() => {
        dispatch({ type: 'GET_COUNT_ALLRESOURCES', payload: countOfResources });
    }, [countOfResources, dispatch])
    
    useMemo(() => {
        axios.get(`${baseURL}?category=books`)
        .then((response) => {
            setCountOfBooksResources(response.data.length);
        })
      }, []);

    useEffect(() => {
        dispatch({ type: 'GET_COUNT_BOOKS', payload: countOfBooksResources });
    }, [countOfBooksResources, dispatch])

    useMemo(() => {
        axios.get(`${baseURL}?category=websites`)
        .then((response) => {
            setCountOfWebsitesResources(response.data.length);
        })
    }, []);
  
    useEffect(() => {
        dispatch({ type: 'GET_COUNT_WEBSITES', payload: countOfWebsitesResources });
    }, [countOfWebsitesResources, dispatch])

    useMemo(() => {
        axios.get(`${baseURL}?category=posts`)
        .then((response) => {
            setCountOfPostsResources(response.data.length);
        })
    }, []);
    
    useEffect(() => {
        dispatch({ type: 'GET_COUNT_POSTS', payload: countOfPostsResources });
    }, [countOfPostsResources, dispatch])

    useMemo(() => {
        axios.get(`${baseURL}?category=soft`)
        .then((response) => {
            setCountOfSoftsResources(response.data.length);
        })
    }, [])

    useEffect(() => {
        dispatch({ type: 'GET_COUNT_SOFTS', payload: countOfSoftsResources });
    }, [countOfSoftsResources, dispatch])

    return (
        <CategoryComponent 
        categoryName={categoryName} 
        baseURL={baseURL} 
        actionInfoSections
        actionSection={actionSection} 
        itemsToShow={itemsToShow}
        searchInclude={searchInclude}
        pagination={pagination}
        pageSize={pageSize}
        addResourceAction
        createUpdate
        isMainPage={isMainPage}
        />
    )
}

export default AllResources;