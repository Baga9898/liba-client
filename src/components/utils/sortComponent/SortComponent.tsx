type SortComponentType = {
    sortType: string, 
    newResourcesIsFirst: any, 
    oldResourcesIsFirst: any, 
    alphabetSort: any,
}

const SortComponent: React.FC<SortComponentType> = ({sortType, newResourcesIsFirst, oldResourcesIsFirst, alphabetSort}) => {
  return (
    <div className='section__wrapper sort-wrapper' style={{height: '200px'}}>
        <h3 className='sort__title'>Sort</h3>
        <button className={sortType === 'newFirst' ? 'sort__item active' : 'sort__item'} onClick={newResourcesIsFirst}>New first</button>
        <button className={sortType === 'oldFirst' ? 'sort__item active' : 'sort__item'} onClick={oldResourcesIsFirst}>Old first</button>
        <button className={sortType === 'alphabet' ? 'sort__item active' : 'sort__item'} onClick={alphabetSort}>A - Z</button>
    </div>
  )
}

export default SortComponent;