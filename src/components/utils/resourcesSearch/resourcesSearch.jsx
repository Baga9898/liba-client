import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const ResourcesSearch = ({ setSearchParametrs }) => {
  return (
    <div className='resources__search_wrapper animate__animated animate__fadeIn'>
        <FontAwesomeIcon icon={faSearch} className='search-icon'/>
        <input className='resources__search' type='text' placeholder='Search...' onChange={e => setSearchParametrs(e.currentTarget.value)}/>
    </div>
  )
}

export default ResourcesSearch;