import React from 'react';
import CategoryComponent from '../../utils/categoryComponent/categoryComponent';

const AllResources = ({ actionSection=true, itemsToShow, searchInclude=true }) => {
    const categoryName = "All resources";
    const baseURL = "https://61c03bd033f24c00178231de.mockapi.io/resources";

    return (
        <CategoryComponent 
        categoryName={categoryName} 
        baseURL={baseURL} 
        actionInfoSections={true} 
        actionSection={actionSection} 
        itemsToShow={itemsToShow}
        searchInclude={searchInclude}
        />
    )
}


export default AllResources;