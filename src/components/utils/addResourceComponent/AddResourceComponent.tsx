import { useState, useEffect } from "react";
import ResourceType from "../../types/ResourceType";

type AddResourceComponentType ={
    resource: ResourceType,
    setResource: any,
    categoriesList: string[], 
    createResource: any, 
}

const AddResourceComponent: React.FC<AddResourceComponentType> = ({ resource, setResource, categoriesList, createResource }) => {
    const [formIsValid, setFormIsValid] = useState(false);
    const [resourceNameError, setResourceNameError] = useState('');
    const [resourceLinkError, setResourceLinkError] = useState('');

    useEffect(() => {
        /^\d*[a-zA-Z][a-zA-Z\d]*$/.test(resource.name) || resource.name.length === 0 ? setResourceNameError('') : setResourceNameError('Only characters or digits');
        /^((ftp|http|https):\/\/)?(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9\-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-\/])*)?/
            .test(resource.link) || resource.link.length === 0 
            ? setResourceLinkError('') 
            : setResourceLinkError('Incorrect link');

        !resourceNameError && !resourceLinkError && resource.name.length !== 0 && resource.link.length !== 0 ? setFormIsValid(true) : setFormIsValid(false);
    }, [resource, resourceLinkError, resourceNameError])
    
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