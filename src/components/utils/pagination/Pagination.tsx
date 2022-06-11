import './pagination.scss';

type PaginationType = {
    resourcesPerPage: number,
    totalCountOfResources: number,
    paginate: (pageNumbers: number) => void,
    currentPage: number,
}

const Pagination: React.FC<PaginationType> = ({ resourcesPerPage, totalCountOfResources, paginate, currentPage}) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalCountOfResources / resourcesPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <ul className='pagination'>
            {
                pageNumbers.map((number, index) => (
                    <li className='page-item' key={'page№' + number}>
                        <button className={currentPage === index + 1 ? 'page-link current-page' : 'page-link'} onClick={() => paginate(number)}>{number}</button>
                    </li>
                ))
            }
        </ul>
    );
};

export default Pagination;