import CategoryComponent from '../../utils/categoryComponent/CategoryComponent';

const Posts = () => {
    const categoryName = 'Posts';
    const baseURL = 'https://61c03bd033f24c00178231de.mockapi.io/resources';
    const getParams = {category: 'posts'};

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

export default Posts;