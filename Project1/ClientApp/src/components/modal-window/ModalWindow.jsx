import React from 'react';
import './modal_window.scss';

const ModalWindow = ({ children, onClose }) => {
  const handleClickLayout = (e) => {
    if (e.target.classList == 'layout') onClose();
  };

  React.useEffect(() => {
    const body = document.querySelector('body');
    body.classList.add('layout-open');

    return () => body.classList.remove('layout-open');
  }, []);

  return (
    <div className="layout" onClick={handleClickLayout}>
      <div className="modal_window">{children}</div>
    </div>
  );
};

export default ModalWindow;
