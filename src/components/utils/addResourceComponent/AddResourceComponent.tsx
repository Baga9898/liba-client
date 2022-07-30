import ResourceType from "../../types/ResourceType";

type AddResourceComponentType ={
    resource: ResourceType,
    setResource: any,
    categoriesList: string[], 
    createResource: any, 
    formIsValid: boolean,
    resourceNameError: string,
    resourceLinkError: string,
}

const AddResourceComponent: React.FC<AddResourceComponentType> = ({ resource, setResource, categoriesList, createResource, formIsValid, resourceNameError, resourceLinkError }) => {
  return (
    <div className='addResourse__wrapper section__wrapper '>
        <h3 className='addResourse__wrapper_title'>Create new resource</h3>
        <div className='addResource__content_wrapper'>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <label className='editModal__content_label'>NAME</label>
                {resourceNameError && <span className='resourceLinkError'>{resourceNameError}</span>}
            </div>
            <input className='editModal__content_input' name='name' type='text' value={resource.name} onChange={e => setResource({...resource, name: e.target.value})}/>
        </div>
        <div className='addResource__content_wrapper'>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <label className='editModal__content_label'>LINK</label>
                {resourceLinkError && <span className='resourceLinkError'>{resourceLinkError}</span>}
            </div>
            <input className='editModal__content_input' name='link' type='text' value={resource.link} onChange={e => setResource({...resource, link: e.target.value})}/>
        </div>
        <div className='addResource__content_wrapper'>
            <label className='editModal__content_label' style={{marginBottom: '8px'}}>CATEGORY</label>
            <select className='editModal__content_input' style={{marginBottom: '24px', textTransform: 'uppercase'}} value={resource.category} onChange={e => setResource({...resource, category: e.target.value})}>
                {categoriesList.map((category: string, index: number) => <option key={`${category}_${index}`} style={{textTransform: 'uppercase'}}>{category}</option>)};
            </select>
        </div>
        <button className={formIsValid ? 'libaModal__footer_button' : 'libaModal__footer_button disabled-create '} onClick={createResource} disabled={!formIsValid}>Create</button>
    </div>
  )
}

export default AddResourceComponent;