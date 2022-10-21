import ResourceType from '../../types/ResourceType';
import ResourceItem from './resourceItem';

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
                <div className='resource__item_wrapper'>
                    <ResourceItem 
                    resource={resource}
                    actionSection={actionSection} 
                    createUpdate={createUpdate} 
                    openEditModal={openEditModal}
                    openDeleteModal={openDeleteModal}                     
                    />
                </div>
            )}
        </>
    )
}

export default ResourceWrapper;