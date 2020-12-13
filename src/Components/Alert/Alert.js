import React, { useContext } from "react";
import AlertContext from "../../ducks/alertCotext";
import { CSSTransition } from "react-transition-group"

const Alert = () => {

  const {alert, hide} = useContext(AlertContext);

  return (
    <CSSTransition
      in={alert.visible}
      timeout={{
        enter: 800,
        exit: 250
      }}
      classNames={'alert'}
      mountOnEnter
      unmountOnExit>
      <div className={`"alert alert-${alert.type || 'warning'} alert-dismissible"`}>
        <strong>Attention!</strong>
        &nbsp;{alert.text}
        <button onClick={hide} type="button" className="close" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </CSSTransition>
  )
};

export default Alert