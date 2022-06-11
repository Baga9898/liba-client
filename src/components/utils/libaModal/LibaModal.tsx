import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import './libaModal.scss';

type LibaModalType = {
    modalTitle: string,
    closeHandler: () => void,
    actionHandler: () => void,
    actionName: string,
    children: React.ReactNode,
}

const LibaModal: React.FC<LibaModalType> = ({modalTitle, closeHandler, actionHandler, actionName, children }) => {
    return (
        <div className='libaModal-overlay'>
            <div className='libaModal-wrapper'>
                <div className='libaModal__header'>
                    <p className='libaModal__header_title'>{modalTitle}</p>
                    <FontAwesomeIcon icon={faTimes} className='libaModal__header_closeButton' onClick={closeHandler}/>
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