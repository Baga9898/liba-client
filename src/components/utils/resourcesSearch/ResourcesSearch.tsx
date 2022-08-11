import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';

type ResourcesSearchType = {
    searchParametrs: string,
    setSearchParametrs: (searchPerams: string) => void,
}

const ResourcesSearch: React.FC<ResourcesSearchType> = ({ searchParametrs, setSearchParametrs }) => {
  const [wrongSearch, setWrongSearch] = useState(false);

  useEffect(() => {
    /^[A-Za-z0-9]*$/.test(searchParametrs) ? setWrongSearch(false) : setWrongSearch(true);
  }, [searchParametrs])

  return (
    <div className='resources__search_wrapper animate__animated animate__fadeIn'>
        <FontAwesomeIcon icon={faSearch} className='search-icon'/>
        {searchParametrs &&
          <FontAwesomeIcon icon={faTimes} className='search-clear' onClick={() => setSearchParametrs('')}/>
        }
        <input className={wrongSearch ? 'resources__search wrongSearch' : 'resources__search'} type='text' placeholder='Search...' value={searchParametrs} onChange={e => setSearchParametrs(e.currentTarget.value)}/>
    </div>
  )
}

export default ResourcesSearch;