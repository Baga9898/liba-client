import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';

type ResourcesSearchType = {
    searchParametrs: any,
    setSearchParametrs: any,
}

const ResourcesSearch: React.FC<ResourcesSearchType> = ({ searchParametrs, setSearchParametrs }) => {
  return (
    <div className='resources__search_wrapper animate__animated animate__fadeIn'>
        <FontAwesomeIcon icon={faSearch} className='search-icon'/>
        {searchParametrs &&
          <FontAwesomeIcon icon={faTimes} className='search-clear' onClick={() => setSearchParametrs('')}/>
        }
        <input className='resources__search' type='text' placeholder='Search...' value={searchParametrs} onChange={e => setSearchParametrs(e.currentTarget.value)}/>
    </div>
  )
}

export default ResourcesSearch;