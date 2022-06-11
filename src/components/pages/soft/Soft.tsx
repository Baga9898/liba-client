import CategoryComponent from '../../utils/categoryComponent/CategoryComponent';

const Soft = () => {
    const categoryName = 'soft';
    const baseURL = 'https://61c03bd033f24c00178231de.mockapi.io/resources';
    const getParams = {category: 'soft'};

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

export default Soft;