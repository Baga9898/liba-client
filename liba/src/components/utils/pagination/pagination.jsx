import React from 'react';

const Pagination = ({ resourcesPerPage, totalCountOfResources, paginate}) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalCountOfResources / resourcesPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div>
            <ul className='pagination'>
                {
                    pageNumbers.map(number => (
                        <li className='page-item' key={"page№" + number}>
                            <button className='page-link' onClick={() => paginate(number)}>{number}</button>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
};

export default Pagination;
