import CategoryComponent from '../../utils/categoryComponent/CategoryComponent';

const Books = () => {
    const categoryName = 'Books';
    const baseURL = 'https://61c03bd033f24c00178231de.mockapi.io/resources';
    const getParams = {category: 'books'};

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