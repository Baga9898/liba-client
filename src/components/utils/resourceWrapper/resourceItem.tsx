import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import ChangeModal from './changeModal';

type ResourceItemProps = {
    resource: {
        id: number,
        name: string,
        link: string,
        description: string,
        createDate: any,
        changedBy: string,
        modifiedDate: string,
        categories: string,
    },
    actionSection: boolean,
    createUpdate: boolean,
    openEditModal: (arg1: number) => void,
    openDeleteModal: (arg1: number) => void,
}

const ResourceItem: React.FC<ResourceItemProps> = ({ resource, actionSection, createUpdate, openEditModal, openDeleteModal }) => {
    const [changeModalIsOpen, setChangeModalIsOpen] = useState(false);
  return (
    <>
        {changeModalIsOpen && <ChangeModal resource={resource}/>}
        <div key={`${resource.name}_${resource.id}`} className='section__wrapper animate__animated animate__fadeIn'>
            <div className='section__leftside'>
                <div className='section__leftside_top'>
                    <div className='section__leftside_name'>{resource.name}</div>
                    <a href={resource.link} target='_blank' className='section__leftside_link' rel='noreferrer'>{resource.link}</a>
                </div>
                <div className='section__leftside_down'>
                    <div className='section__leftside_date'>{resource.createDate}</div>
                </div>
            </div>
            <div className='section__rightside'>
                <div className='section__rightside_top'>
                    <div className='section__rightside_category'>{resource.categories}</div>
                    <div 
                        className='section__rightside_circle' 
                        onMouseEnter={() => setChangeModalIsOpen(true)}
                        onMouseLeave={() => setChangeModalIsOpen(false)}
                    >
                    </div>
                </div>
                {(actionSection && createUpdate) &&
                    <div className='section__rightside_bottom'>
                        <FontAwesomeIcon icon={faPen} className='edit-section-icon' onClick={() => openEditModal(resource.id)}/>  
                        <FontAwesomeIcon icon={faTrashAlt} className='delete-section-icon' onClick={() => openDeleteModal(resource.id)}/>
                    </div>
                }
            </div>
        </div>
    </>
  )
}

export default ResourceItem;