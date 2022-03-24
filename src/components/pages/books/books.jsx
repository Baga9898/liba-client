import { React, useEffect, useState } from 'react';
import axios from 'axios';
import CategoryComponent from '../../utils/categoryComponent/categoryComponent';
import { useDispatch } from 'react-redux';

const Books = () => {
    const categoryName = "Books";
    const baseURL = "https://61c03bd033f24c00178231de.mockapi.io/resources";
    const getParams = {category: "books"};

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

export default Books;