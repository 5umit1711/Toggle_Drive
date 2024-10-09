import { useContext, useEffect } from "react";
import { ToastContext } from "../context/ToastContext";

const Toast = ({msg}) => {
    const {toastMessage, setToastMessage} = useContext(ToastContext);

    useEffect(()=>{
        setInterval(() => {
            setToastMessage("");
        }, 2000);
    }, [msg]);

  return (
    <div className="toast toast-top toast-end">
      <div className="alert alert-info">
        <span>{msg}</span>
      </div>
    </div>
  );
};

export default Toast
