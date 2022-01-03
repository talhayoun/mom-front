import { useContext, useEffect, useState } from "react";
import MealsContext from "../../contex/mealscontext";
import RecepiesList from "./RecepiesList";

const DUMMY_LIST = [
    {
        id: '1',
        title: 'ירקות ממולאים',
        time: 15
    },
    {
        id: '2',
        title: 'עראייס בפיתה',
        time: 10
    },
]

const Recepies = () => {
    const mealsCtx = useContext(MealsContext);
    const [meals, setMeals] = useState(mealsCtx.meals);

    useEffect(() => {
        window.scrollTo(0, 0)

        fetch(`${process.env.REACT_APP_SERVER_API}/meal`)
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
            }).then((data) => setMeals(data.meals))
    }, [])
    return (
        <div className="recepies">
            <img className="recepies-background" />
            <div className="recepies-container">
                <h1>רשימת מתכונים</h1>
                <RecepiesList recepies={meals} />
            </div>
            <br />
        </div>
    );
};

export default Recepies;