type CountOfResourcesComponentType = {
    categoryName: string,
    count: number,
}

const CountOfResourcesComponent: React.FC<CountOfResourcesComponentType> = ({ categoryName, count}) => {
  return (
    <div className='section__wrapper category-info-wrapper'>
        <h3 className='nameOfCategory'>{categoryName}</h3>
        <p className='countOfResources-text'>Count of resources:<span className='countOfResources'>{count}</span></p>
    </div>
  )
}

export default CountOfResourcesComponent;