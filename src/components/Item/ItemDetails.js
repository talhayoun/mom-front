import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserContext from "../../contex/usercontext";
import { IoMdTrash } from "react-icons/io";
import { IoPencilSharp } from "react-icons/io5";
import Message from "../ui/Message";

const ItemDetails = () => {
    const { id } = useParams();
    const [image, setImage] = useState();
    const [ingredients, setIngredients] = useState([]);
    const [steps, setSteps] = useState([]);
    const [time, setTime] = useState();
    const [title, setTitle] = useState();
    const [showModal, setShowModal] = useState(false);

    const userCtx = useContext(UserContext);
    const navigate = useNavigate();

    const deleteItemHandler = () => {
        fetch(`${process.env.REACT_APP_SERVER_API}/meal/${id}`, {
            method: "DELETE",
        }).then((res) => {
            if (res.ok) {
                navigate("/")
            }
        });
    };
    const editItemHandler = () => {
        navigate(`/recepie/${id}`)
    };

    useEffect(() => {
        window.scrollTo(0, 0);

        fetch(`${process.env.REACT_APP_SERVER_API}/meal/${id}`)
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
            })
            .then((data) => {
                console.log(data);
                setImage(data.meal.image);
                setIngredients(data.meal.ingredients);
                setTime(data.meal.time);
                setSteps(data.meal.steps);
                setTitle(data.meal.title);
            });
    }, []);

    return (
        <div className="itemdetails">
            <div className="itemsdetails-container">
                <div className="itemsdetails-container-content">
                    <div className="itemsdetails-creator">
                        <img className="itemsdetails-avatar" />
                        <p>| 23/07/2021</p>
                        <p>| {time} דק'</p>
                        {userCtx.isLoggedIn && (
                            <>
                                <IoMdTrash
                                    fontSize={20}
                                    style={{ marginTop: 20, cursor: "pointer" }}
                                    onClick={() => setShowModal(true)}
                                />
                                <IoPencilSharp
                                    fontSize={20}
                                    style={{ marginTop: 20, cursor: "pointer" }}
                                    onClick={editItemHandler}
                                />
                            </>
                        )}
                    </div>
                    <div className="itemsdetails-header">
                        <h1>{title}</h1>
                        <span>זמן הכנה: {time}</span>
                        {image && (
                            <img
                                src={`${process.env.REACT_APP_SERVER_API}/image/${image}`}
                                alt={title}
                            />
                        )}
                    </div>
                    <h2>מצרכים:</h2>
                    <ol>
                        {ingredients &&
                            ingredients.map((item) => <li key={item}>{item}</li>)}
                    </ol>
                    <h2>הוראות הכנה</h2>
                    {steps && steps.map((step, index) => <p key={index}>{step}</p>)}
                </div>
            </div>
            {showModal && <Message message={`את בטוחה שאת רוצה למחוק את המתכון הזה?`} onApprove={deleteItemHandler} onCancel={() => setShowModal(false)} />}
        </div>
    );
};

export default ItemDetails;
