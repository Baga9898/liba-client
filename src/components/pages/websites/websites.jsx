import React from 'react';
import CategoryComponent from '../../utils/categoryComponent/categoryComponent';

const Websites = () => {
    const categoryName = 'Websites';
    const baseURL = 'https://61c03bd033f24c00178231de.mockapi.io/resources';
    const getParams = {category: 'websites'};

    return(
        <CategoryComponent 
        categoryName={categoryName} 
        baseURL={baseURL} 
        getParams={getParams}
        pagination
        actionInfoSections
        actionSection
        searchInclude
        />
    );
}

export default Websites;