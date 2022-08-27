import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import './libaModal.scss';

type LibaModalType = {
    headerType?: string,
    customHeaderContent?: React.ReactNode,
    modalTitle?: string,
    closeHandler: () => void,
    actionHandler: () => void,
    actionName: string,
    children: React.ReactNode,
    isWide?: boolean,
}

const LibaModal: React.FC<LibaModalType> = ({ headerType, customHeaderContent, modalTitle, closeHandler, actionHandler, actionName, children, isWide }) => {
    return (
        <div className='libaModal-overlay'>
            <div className={isWide ? 'libaModal-wrapper wide' : 'libaModal-wrapper'}>
                <div className='libaModal__header'>
                    {headerType === 'custom' ? 
                        customHeaderContent :
                        <>
                            <p className='libaModal__header_title'>{modalTitle}</p>
                            <FontAwesomeIcon icon={faTimes} className='libaModal__header_closeButton' onClick={closeHandler} />
                        </>
                    }
                </div>
                <div className='libaModal__content'>
                    {children}
                </div>
                <div className='libaModal__footer'>
                    <button className='libaModal__footer_button' onClick={closeHandler}>Cancel</button>
                    <button className='libaModal__footer_button' onClick={actionHandler}>{actionName}</button>
                </div>
            </div>
        </div>
    );
};

export default LibaModal;