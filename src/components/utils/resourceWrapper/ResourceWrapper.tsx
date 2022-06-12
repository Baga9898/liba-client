import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import ResourceType from '../../types/ResourceType';

type ResourceWrapperType = {
    dataSource: ResourceType[],
    actionSection: boolean,
    openEditModal: (id: number) => void, 
    openDeleteModal: (id: number) => void, 
    createUpdate: boolean,
}

const ResourceWrapper: React.FC<ResourceWrapperType> = ({ dataSource, actionSection, openEditModal, openDeleteModal, createUpdate }) => {
    return (
        <>
            {dataSource.map((resource: ResourceType) =>
                <div key={`${resource.name}_${resource.id}`} className='section__wrapper animate__animated animate__fadeIn'>
                    <div className='section__leftside'>
                        <div className='section__leftside_top'>
                            <div className='section__leftside_name'>{resource.name}</div>
                            <a href={resource.link} target='_blank' className='section__leftside_link' rel='noreferrer'>{resource.link}</a>
                        </div>
                        <div className='section__leftside_down'>
                            <div className='section__leftside_date'>{resource.date}</div>
                        </div>
                    </div>
                    <div className='section__rightside'>
                        <div className='section__rightside_top'>
                            <div className='section__rightside_category'>{resource.category}</div>
                        </div>
                        {(actionSection && createUpdate) &&
                            <div className='section__rightside_bottom'>
                                <FontAwesomeIcon icon={faPen} className='edit-section-icon' onClick={() => openEditModal(resource.id)}/>  
                                <FontAwesomeIcon icon={faTrashAlt} className='delete-section-icon' onClick={() => openDeleteModal(resource.id)}/>
                            </div>
                        }
                    </div>
                </div>
            )}
        </>
    )
}

export default ResourceWrapper;