import React from 'react'

const AddResourceComponent = ({ resourceName, setResourceName, resourceLink, resourceLinkDirty, resourceLinkError, setResourceLink, resourceCategory, setResourceCategory, categoriesList, createResource, blurHandler, linkHandler, formIsValid }) => {
  return (
    <div className='addResourse__wrapper section__wrapper '>
        <h3 className='addResourse__wrapper_title'>Create new resource</h3>
        <div className='addResource__content_wrapper'>
            <label className='editModal__content_label'>NAME</label>
            <input className='editModal__content_input' type="text" value={resourceName} onChange={e => setResourceName(e.target.value)}/>
        </div>
        <div className='addResource__content_wrapper'>
            <label className='editModal__content_label'>LINK</label>
            {(resourceLinkDirty && resourceLinkError) && <span className='resourceLinkError'>{resourceLinkError}</span>}
            <input required={true} className='editModal__content_input' onBlur={e => blurHandler(e)} name='link' type="text" value={resourceLink} onChange={e => linkHandler(e)}/>
        </div>
        <div className='addResource__content_wrapper'>
            <label className='editModal__content_label' style={{marginBottom: "8px"}}>CATEGORY</label>
            <select className='editModal__content_input' style={{marginBottom: "24px", textTransform: "uppercase"}} type="text" value={resourceCategory} onChange={e => setResourceCategory(e.target.value)}>
                {categoriesList.map((category, index) => <option key={Date.now + index} style={{textTransform: "uppercase"}}>{category}</option>)};
            </select>
        </div>
        <button className='libaModal__footer_button' onClick={createResource} disabled={!formIsValid}>Create</button>
    </div>
  )
}

export default AddResourceComponent