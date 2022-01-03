import { createContext, useState } from "react";

const MealsContext = createContext({
    meals: [],
    replaceMeals: (mealsList) => { }
});

export const MealsContextProvider = (props) => {
    const [meals, setMeals] = useState([]);

    const replaceMealsHandler = (mealsList) => {
        setMeals(mealsList)
    }

    const mealsCtx = {
        meals: meals,
        replaceMeals: replaceMealsHandler
    };

    return (
        <MealsContext.Provider value={mealsCtx}>
            {props.children}
        </MealsContext.Provider>
    )
}

export default MealsContext;