import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import Preloader from '../../utils/preloader/preloader';
import '../../pages/allResources/allResources.scss'
import LibaModal from '../libaModal/libaModal';

const CategoryComponent = ({ categoryName, baseURL, getParams, actionInfoSections=false, actionSection=false, itemsToShow }) => {
    const [allResources, setAllResources] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [idOfResource, setIdOfResource] = useState("");

    const [resourceName, setResourceName] = useState("");
    const [resourceLink, setResourceLink] = useState("");
    const [resourceCategory, setResourceCategory] = useState("");

    const [editModalIsOpen, setEditModalIsOpen] = useState(false);
    const [editResourceName, setEditResourceName] = useState("");
    const [editResourceLink, setEditResourceLink] = useState("");
    const [editResourceCategory, setEditResourceCategory] = useState("");

    const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);


    useEffect(() => {
        if (itemsToShow) {
            axios.get(baseURL, {params: getParams})
            .then((response) => {
                const newArray = response.data;
                const reverseArray = newArray.reverse().slice(0, itemsToShow);
                setAllResources(reverseArray);
                setIsLoading(false);
            });
        } else {
            axios.get(baseURL, {params: getParams})
            .then((response) => {
                const newArray = response.data;
                const reverseArray = newArray.reverse();
                setAllResources(reverseArray);
                setIsLoading(false);
            });
        }
        
    }, [itemsToShow, baseURL, getParams]);

    const createResource = () => {
        axios.post(baseURL, {
                name: resourceName,
                link: resourceLink,
                category: resourceCategory,
                date: "date",
            })
                .then((response) => {
                    setAllResources([response.data, ...allResources]);
            });
            setResourceName("");
            setResourceLink("");
            setResourceCategory("");
        }

    const openEditModal = (resourceId) => {
        setEditModalIsOpen(true);
        setIdOfResource(resourceId)
    }

    const editResource = (resourceId) => {
        axios.put(`${baseURL}/${resourceId}`, {
            name: editResourceName,
            link: editResourceLink,
            category: editResourceCategory,
            date: Date.now,
        })
        .then((response) => {
            const indexOfChangedResource = allResources.findIndex((resource) => resource.id === response.data.id);
            const newArray = [...allResources];
            newArray[indexOfChangedResource] = response.data;
            setAllResources(newArray);
        });
        setEditResourceName("");
        setEditResourceLink("");
        setEditResourceCategory("");
        setEditModalIsOpen(false);
    }

    const openDeleteModal = (resourceId) => {
        setDeleteModalIsOpen(true);
        setIdOfResource(resourceId);
    }

    const deleteResourse = (resourceId) => {
        axios.delete(`${baseURL}/${resourceId}`)
        .then((response) => {
            const newArray = allResources.filter((resource) => resource.id !== response.data.id);
            setAllResources(newArray);
        })
        setDeleteModalIsOpen(false);
    }

    if (!allResources || allResources.length === 0) return (
        <div>{isLoading ? <Preloader/> : <p className='oops'>Oops, there's nothing<br/>here yet</p>}</div>
    )

    return (
        <div className={actionInfoSections ? 'action-info-wrapper' : ""}>
            <div className='allResources__wrapper'>
                {
                    allResources.map((resource) =>
                        <div key={resource.id} className='section__wrapper'>
                            <div className='section__leftside'>
                                <div className='section__leftside_top'>
                                    <div className='section__leftside_name'>{resource.name}</div>
                                    <div className='section__leftside_link'>{resource.link}</div>
                                </div>
                                <div className='section__leftside_down'>
                                    <div className='section__leftside_date'>{resource.date}</div>
                                </div>
                            </div>
                            <div className='section__rightside'>
                                <div className="section__rightside_top">
                                    <div className='section__rightside_category'>{resource.category}</div>
                                </div>
                                {actionSection &&
                                    <div className="section__rightside_bottom">
                                        <FontAwesomeIcon icon={faPen} className="edit-section-icon" onClick={() => openEditModal(resource.id)}/>  
                                        <FontAwesomeIcon icon={faTrashAlt} className="delete-section-icon" onClick={() => openDeleteModal(resource.id)}/>
                                    </div>
                                }
                            </div>
                        </div>
                    )
                }
            </div>
            <div>
                {/* TODO: Выести в отдельный компонент. */}
                {/* <div className='countOfResources'>{allResources.length}</div> */}
                {actionSection && 
                    <div className='allResources__actions_wrapper'>
                        <div className='addResourse__wrapper section__wrapper'>
                            <input className='editModal__content_input' type="text" placeholder='Name' value={resourceName} onChange={e => setResourceName(e.target.value)}/>
                            <input className='editModal__content_input' type="text" placeholder='Link' value={resourceLink} onChange={e => setResourceLink(e.target.value)}/>
                            <input className='editModal__content_input' type="text" placeholder='Category' value={resourceCategory} onChange={e => setResourceCategory(e.target.value)}/>
                            <button className='libaModal__footer_button' onClick={createResource}>Create new resourse</button>
                        </div>
                    </div>
                }
            </div>
            {editModalIsOpen &&
                <LibaModal modalTitle="Edit resource" closeHandler={() => setEditModalIsOpen(false)} actionHandler={() => editResource(idOfResource)} actionName="Edit">
                    <input className='editModal__content_input' type="text" placeholder='Name' onChange={e => setEditResourceName(e.target.value)}/>
                    <input className='editModal__content_input' type="text" placeholder='Link' onChange={e => setEditResourceLink(e.target.value)}/>
                    <input className='editModal__content_input' type="text" placeholder='Category' onChange={e => setEditResourceCategory(e.target.value)}/>
                </LibaModal>
            }
            {deleteModalIsOpen && 
                <LibaModal modalTitle="Delete resource" closeHandler={() => setDeleteModalIsOpen(false)} actionHandler={() => deleteResourse(idOfResource)} actionName="Delete">
                    <p className='editModal__content_text'>Are you sure you want to delete the resource?</p>
                </LibaModal>
            }
        </div>
    )
};

export default CategoryComponent;
