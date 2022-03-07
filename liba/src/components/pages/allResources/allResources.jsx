import React from 'react';
import CategoryComponent from '../../utils/categoryComponent/categoryComponent';

const AllResources = ({ actionSection=true, itemsToShow, searchInclude=true, pagination=true, pageSize, fixHeight=true, isMainPage=false }) => {
    const categoryName = "All resources";
    const baseURL = "https://61c03bd033f24c00178231de.mockapi.io/resources";

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