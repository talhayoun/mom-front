import { useNavigate } from "react-router-dom";

const RecepieItem = (props) => {
    const { title, time, id, image } = props;

    const navigate = useNavigate();


    return (
        <div className="recepie-item" onClick={() => navigate(`/item/${id}`)}>
            <div className="recepie-item-content">
                <h1>{title}</h1>
                <p>זמן הכנה: {time} דק'</p>
            </div>
            <img src={`${process.env.REACT_APP_SERVER_API}/image/${image}`} />
        </div>
    );
};

export default RecepieItem;
