import { useState, useEffect } from 'react';
import ResourceType from '../../types/ResourceType';
import LibaInput from '../libaInput/libaInput';
import LibaSelect from '../libaSelect/libaSelect';

type AddResourceComponentType ={
    resource: ResourceType,
    setResource: any,
    categoriesList: string[], 
    createResource: any, 
}

const AddResourceComponent: React.FC<AddResourceComponentType> = ({ resource, setResource, categoriesList, createResource }) => {
    const [formIsValid, setFormIsValid] = useState(false);
    const [formErrorNotification, setFormErrorNotification] = useState<any>(false);
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

    const openErrorNotification = () => {
        setFormErrorNotification(true);
    }

    const closeErrorNotification = () => {
        setFormErrorNotification(false);
    }

    const validationCheck = () => {
        formIsValid && createResource();
    }
    
    return (
        <div className='addResourse__wrapper section__wrapper '>
            <h3 className='addResourse__wrapper_title'>Create new resource</h3>
            <LibaInput inputName='name' resourceError={resourceNameError} value={resource.name} changeFunction={(e: any) => setResource({...resource, name: e.target.value})}/>
            <LibaInput inputName='link' resourceError={resourceLinkError} value={resource.link} changeFunction={(e: any) => setResource({...resource, link: e.target.value})}/>
            <LibaSelect selectName='category' value={resource.categories} categoriesList={categoriesList} changeFunction={e => setResource({...resource, category: e.target.value})}/>
            <div className='libaModal__footer-wrapper'>
                <button className={formIsValid ? 'libaModal__footer_button' : 'libaModal__footer_button disabled-create '} onClick={validationCheck} onMouseEnter={openErrorNotification} onMouseLeave={closeErrorNotification}>Create</button>
                {!formIsValid && formErrorNotification &&
                    <div className='formErrorNotification'>Fill in all fields with correct values</div>
                }
            </div>
        </div>
    )
}

export default AddResourceComponent;