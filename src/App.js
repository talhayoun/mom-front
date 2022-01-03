import { useContext, useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import ItemDetails from "./components/Item/ItemDetails";
import Login from "./components/Login/Login";
import Nav from "./components/Nav/Nav";
import RecepieForm from "./components/Recepies/RecepieForm";
import Recepies from "./components/Recepies/Recepies";
import MealsContext from "./contex/mealscontext";
import RTL from "./contex/rtl";
import UserContext from "./contex/usercontext";
const App = () => {

  const userCtx = useContext(UserContext);
  const mealsCtx = useContext(MealsContext);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_API}/meal`)
      .then(res => { if (res.ok) return res.json() })
      .then(meals => mealsCtx.replaceMeals(meals.meals));
  }, [])
  return (
    <BrowserRouter>
      <RTL>
        <Nav />
        <Routes>
          <Route path="/" element={<HomePage />} />
          {!userCtx.isLoggedIn &&
            <Route path="/login" element={<Login />} />
          }
          <Route path="/recepies" element={<Recepies />} />
          <Route path="/recepie" element={<RecepieForm />} />
          <Route path="/recepie/:id" element={<RecepieForm />} />
          <Route path="/item/:id" element={<ItemDetails />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </RTL>
    </BrowserRouter>
  );
};

export default App;
