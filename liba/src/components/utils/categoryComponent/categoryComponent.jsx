import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Preloader from '../../utils/preloader/preloader';
import '../../pages/allResources/allResources.scss'

const CategoryComponent = ({ categoryName, baseURL, getParams, actionInfoSections=false, actionSection=false, itemsToShow }) => {
    const [allResources, setAllResources] = useState([]);
    const [editModal, setEditModal] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [idOfResource, setIdOfResource] = useState("");

    const [resourceName, setResourceName] = useState("");
    const [resourceLink, setResourceLink] = useState("");
    const [resourceCategory, setResourceCategory] = useState("");

    const [editResourceName, setEditResourceName] = useState("");
    const [editResourceLink, setEditResourceLink] = useState("");
    const [editResourceCategory, setEditResourceCategory] = useState("");


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

    const modalEditResourse = (resourceId) => {
        setEditModal(true);
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
        setEditModal(false);
    }

    const deleteResourse = (resourceId) => {
        axios.delete(`${baseURL}/${resourceId}`)
        .then((response) => {
            const newArray = allResources.filter((resource) => resource.id !== response.data.id);
            setAllResources(newArray);
        })
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
                                        <FontAwesomeIcon icon={faPen} className="edit-section-icon" onClick={() => modalEditResourse(resource.id)}/>  
                                        <FontAwesomeIcon icon={faTrashAlt} className="delete-section-icon" onClick={() => deleteResourse(resource.id)}/>
                                    </div>
                                }
                            </div>
                        </div>
                    )
                }
            </div>
            <div>
                {actionSection && 
                    <div className='allResources__actions_wrapper'>
                        {/* TODO: Выести в отдельный компонент. */}
                        {/* <div className='countOfResources'>{allResources.length}</div> */}
                        {/* TODO: Выести в отдельный компонент. */}
                        <div className='addResourse__wrapper section__wrapper'>
                            <input className='addResourse__input' type="text" placeholder='Name' value={resourceName} onChange={e => setResourceName(e.target.value)}/>
                            <input className='addResourse__input' type="text" placeholder='Link' value={resourceLink} onChange={e => setResourceLink(e.target.value)}/>
                            <input className='addResourse__input' type="text" placeholder='Category' value={resourceCategory} onChange={e => setResourceCategory(e.target.value)}/>
                            <button className='addResourse__button' onClick={createResource}>Create new resourse</button>
                        </div>
                    </div>
                }
            </div>
            {/* TODO: Вынести в отдельный компонент. */}
            {editModal &&
                <div className='editModal-overlay'>
                    <div className="editModal-wrapper">
                        <div className='editModal__header'>
                            <p className='editModal__header_title'>Edit resource</p>
                            <FontAwesomeIcon icon={faTimes} className='editModal__header_closeButton' onClick={() => setEditModal(false)}/>
                        </div>
                        <div className='editModal__content'>
                            <input className='editResource__input' type="text" placeholder='Name' value={editResourceName} onChange={e => setEditResourceName(e.target.value)}/>
                            <input className='editResource__input' type="text" placeholder='Link' value={editResourceLink} onChange={e => setEditResourceLink(e.target.value)}/>
                            <input className='editResource__input' type="text" placeholder='Category' value={editResourceCategory} onChange={e => setEditResourceCategory(e.target.value)}/>
                        </div>
                        <div className='editModal__footer'>
                            <button className='editResourse__button' onClick={() => editResource(idOfResource)}>Edit resourse</button>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
};

export default CategoryComponent;
