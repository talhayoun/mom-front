import { Fragment } from "react";
import Blackscreen from "./Blackscreen";

const Message = (props) => {
    const { message, onApprove, onCancel } = props;
    return (
        <Fragment>
            <div className="message">
                <p>{message}</p>
                <button onClick={onApprove}>אשר</button>
                <button onClick={onCancel}>בטל</button>
            </div>
            <Blackscreen onClick={onCancel} />
        </Fragment>
    );
};

export default Message;
