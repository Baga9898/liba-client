import { useMemo } from 'react';
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
    // const baseURL = 'http://localhost:5000/api/resources';
    const dispatch = useDispatch();

    useMemo(() => {
        axios.get(baseURL)
        .then((response) => {
            dispatch({ type: 'GET_COUNT_ALLRESOURCES', payload: response.data.length });
        })
    }, [dispatch]);
    
    useMemo(() => {
        axios.get(`${baseURL}?category=books`)
        .then((response) => {
            dispatch({ type: 'GET_COUNT_BOOKS', payload: response.data.length});
        })
      }, [dispatch]);

    useMemo(() => {
        axios.get(`${baseURL}?category=websites`)
        .then((response) => {
            dispatch({ type: 'GET_COUNT_WEBSITES', payload: response.data.length });
        })
    }, [dispatch]);

    useMemo(() => {
        axios.get(`${baseURL}?category=posts`)
        .then((response) => {
            dispatch({ type: 'GET_COUNT_POSTS', payload: response.data.length });
        })
    }, [dispatch]);

    useMemo(() => {
        axios.get(`${baseURL}?category=soft`)
        .then((response) => {
            dispatch({ type: 'GET_COUNT_SOFTS', payload: response.data.length });
        })
    }, [dispatch])

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