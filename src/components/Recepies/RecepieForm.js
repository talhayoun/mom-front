import { Button, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { createTheme } from "@mui/system";
import { IoMdAdd } from "react-icons/io";
import Fab from "@mui/material/Fab";
import ItemsList from "./ItemsList";
import ImagePreview from "../ImageUpload/ImagePreview";
import { useNavigate, useParams } from "react-router-dom";
import UserContext from "../../contex/usercontext";

const RecepieForm = () => {
    const [title, setTitle] = useState("");
    const [preparationTime, setPerparationTime] = useState(0);
    const [showIngredientModal, setShowIngredientsModal] = useState(false);
    const [showStepsModal, setShowStepsModal] = useState(false);
    const [ingredients, setIngredients] = useState([]);
    const [steps, setSteps] = useState([]);
    const [image, setImage] = useState();
    const [error, setError] = useState("");
    const [isEditorMode, setIsEditorMode] = useState(false)
    const [response, setResponse] = useState("");

    const { id } = useParams();
    const userCtx = useContext(UserContext);
    const navigate = useNavigate();


    const formSubmitHandler = () => {
        if (!title || !preparationTime || steps.length === 0 || ingredients.steps === 0) {
            setError("כל השדות חובה");
            setTimeout(() => {
                setError(false);
            }, 3000);
        }

        const newFormData = new FormData();
        newFormData.append('title', title);
        newFormData.append('time', preparationTime);
        const jsonSteps = JSON.stringify(steps)
        newFormData.append('steps', jsonSteps);
        const jsonIngredients = JSON.stringify(ingredients)
        newFormData.append('ingredients', jsonIngredients);
        console.log(image[0]);
        if (image.length > 0)
            newFormData.append('image', image[0]);

        fetch(`${process.env.REACT_APP_SERVER_API}/meal`, {
            method: 'POST',
            body: newFormData
        }).then((res) => {
            if (res.ok) {
                setResponse('המתכון עלה בהצלחה')
                setTimeout(() => {
                    setResponse("");
                }, 3000);
            }
        })

    };

    const updateItemHandler = () => {
        console.log("here")
        let formData = new FormData();
        console.log(typeof image, image)
        if (typeof image !== 'string') {
            formData.append('image', image[0]);
        };
        formData.append('title', title);
        let jsonIngredients = JSON.stringify(ingredients)
        formData.append('ingredients', jsonIngredients);
        let jsonSteps = JSON.stringify(steps);
        formData.append('steps', jsonSteps);
        formData.append('time', preparationTime);

        fetch(`${process.env.REACT_APP_SERVER_API}/meal/${id}`,
            {
                method: 'PATCH',
                body: formData,
                headers: {
                    'authorization': userCtx.token
                }
            }).then((res) => {
                console.log(res)
                if (res.ok) {
                    setResponse('עודכן בהצלחה')
                    setTimeout(() => {
                        setResponse("");
                    }, 3000);
                }
                else {
                    throw new Error()
                }
            })
            .catch((err) => {
                console.log(err);
                userCtx.logout();
            })
    }

    const addIngredientsHandler = () => {
        setShowIngredientsModal(true);
    };

    const addStepsHandler = () => {
        setShowStepsModal(true);
    }

    useEffect(() => {
        if (!userCtx.isLoggedIn) navigate("/");
        if (id) {
            setIsEditorMode(true)
            fetch(`${process.env.REACT_APP_SERVER_API}/meal/${id}`)
                .then((res) => {
                    if (res.ok) {
                        return res.json()
                    }
                }).then((data) => {
                    setImage(data.meal.image)
                    setIngredients(data.meal.ingredients);
                    setSteps(data.meal.steps);
                    setPerparationTime(data.meal.time);
                    setTitle(data.meal.title)
                })
        }
        else {
            setIsEditorMode(false)
            setImage("")
            setIngredients([])
            setSteps([])
            setPerparationTime("")
            setTitle("")
        }
    }, [id, userCtx]);

    return (
        <div className="recepie-form">
            <form dir="rtl" style={{ position: 'relative' }}>
                <h1>פרטי המתכון</h1>
                <TextField
                    id="standard-basic"
                    style={{ maxWidth: 250 }}
                    label="כותרת"
                    variant="standard"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <TextField
                    id="standard-basic"
                    style={{ maxWidth: 50 }}
                    label="זמן הכנה"
                    variant="standard"
                    type={"number"}
                    value={preparationTime}
                    onChange={(e) => setPerparationTime(e.target.value)}
                />
                <ImagePreview image={image} setImage={setImage} />
                <div
                    onClick={addIngredientsHandler}
                    className="recepie-form-ingredients"
                >
                    <label style={{ fontSize: 20 }}>הוסף מצרכים</label>
                    <Fab
                        color="primary"
                        aria-label="add"
                        style={{ height: 30, width: 35, marginRight: 20 }}
                    >
                        <IoMdAdd fontSize={25} />
                    </Fab>
                </div>
                <div onClick={addStepsHandler}>
                    <label style={{ fontSize: 20 }}>הוסף שלבים</label>
                    <Fab
                        color="primary"
                        aria-label="add"
                        style={{ height: 30, width: 35, marginRight: 20 }}
                    >
                        <IoMdAdd fontSize={25} />
                    </Fab>
                </div>
                {error && <p className="error-message" style={{ margin: '0 auto', position: 'absolute', bottom: 0 }}>{error}</p>}
                {response && <p style={{ margin: '0 auto', position: 'absolute', bottom: 0, fontSize: 25 }}>{response}</p>}
                <Button
                    style={{
                        gridRowStart: 5,
                        gridColumnStart: 1,
                        gridColumnEnd: 3,
                        width: 250,
                        height: 50,
                        margin: "0 auto",
                    }}
                    onClick={isEditorMode ? updateItemHandler : formSubmitHandler}
                    variant="contained"
                >
                    {isEditorMode ? "עדכן מתכון" : "העלה מתכון!"}
                </Button>
            </form>
            {showIngredientModal && (
                <ItemsList
                    onChangeHandler={setIngredients}
                    list={ingredients}
                    title="מצרכים"
                    closeModal={setShowIngredientsModal}
                />
            )}
            {showStepsModal && (
                <ItemsList
                    onChangeHandler={setSteps}
                    list={steps}
                    title="שלבים"
                    closeModal={setShowStepsModal}
                />
            )}
        </div>
    );
};

export default RecepieForm;
