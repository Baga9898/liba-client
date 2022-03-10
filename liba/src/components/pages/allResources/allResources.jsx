import { React, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import CategoryComponent from '../../utils/categoryComponent/categoryComponent';
import { useDispatch } from 'react-redux';

const AllResources = ({ actionSection=true, itemsToShow, searchInclude=true, pagination=true, pageSize, fixHeight=true, isMainPage=false }) => {
    const categoryName = "All resources";
    const baseURL = "https://61c03bd033f24c00178231de.mockapi.io/resources";
    const [countOfResources, setCountOfResources] = useState(null);
    const [countOfBooksResources, setCountOfBooksResources] = useState(null);
    const [countOfWebsitesResources, setCountOfWebsitesResources] = useState(null);
    const [countOfPostsResources, setCountOfPostsResources] = useState(null);
    const dispatch = useDispatch();

    // TODO: Сделать универсальную функцию, перебирающую массив категорий.
    useMemo(() => {
        axios.get(baseURL)
        .then((response) => {
            setCountOfResources(response.data.length);
        })
    }, []);

    dispatch({ type: 'GET_COUNT_ALLRESOURCES', payload: countOfResources });

    useMemo(() => {
        axios.get(`${baseURL}?category=books`)
        .then((response) => {
            setCountOfBooksResources(response.data.length);
        })
      }, []);
  
    dispatch({ type: 'GET_COUNT_BOOKS', payload: countOfBooksResources });

    useMemo(() => {
        axios.get(`${baseURL}?category=websites`)
        .then((response) => {
            setCountOfWebsitesResources(response.data.length);
        })
      }, []);
  
    dispatch({ type: 'GET_COUNT_WEBSITES', payload: countOfWebsitesResources });

    useMemo(() => {
        axios.get(`${baseURL}?category=posts`)
        .then((response) => {
            setCountOfPostsResources(response.data.length);
        })
      }, []);
  
    dispatch({ type: 'GET_COUNT_POSTS', payload: countOfPostsResources });

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
        fixHeight={fixHeight}
        oneCategoryPage={false}
        addResourceAction
        createUpdate
        isMainPage={isMainPage}
        />
    )
}


export default AllResources;