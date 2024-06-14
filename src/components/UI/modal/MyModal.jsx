import React from 'react';
import cl from './MyModal.module.css'

const MyModal = ({children, visible, setVisible}) => {
    const rootClasses = [cl.modal]
    if (visible) {
        rootClasses.push(cl.active);
    }

    return (
        <div className={rootClasses.join(' ')} onClick={() => setVisible ? setVisible(false) : undefined}>
            <div className={cl.modalContent} onClick={(e => e.stopPropagation())}>
                {children}
            </div>
        </div>
    );
};

export default MyModal;