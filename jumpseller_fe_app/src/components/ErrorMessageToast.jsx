import React from "react";
import Toast from 'react-bootstrap/Toast';
import { ToastBody } from 'react-bootstrap'

function ErrorMessageToast(props){

    function onClose(){
        props.Closed()
    }


    return (
        <Toast onClose={onClose} delay={3000} autohide>
          <Toast.Header>
            <strong className="me-auto">Oops! Something went wrong.</strong>
          </Toast.Header>
          <ToastBody>{props.errorMessage}</ToastBody>
        </Toast>
      );
}

export default ErrorMessageToast;