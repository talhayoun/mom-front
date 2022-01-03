import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import MealsContext from "../../contex/mealscontext";
import UserContext from "../../contex/usercontext";

const Nav = () => {
    const [search, setSearch] = useState();
    const [suggestions, setSuggestions] = useState([]);
    const navigate = useNavigate();

    const userCtx = useContext(UserContext);
    const mealsCtx = useContext(MealsContext);

    const onSearchHandler = (text) => {
        setSearch(text);
        let filterList = [...mealsCtx.meals];
        filterList = filterList.filter(item => item.title.includes(text));
        let fiveItemsOnly = filterList.splice(0, 5);
        setSuggestions(fiveItemsOnly)
    };

    const onClickSuggestionHandler = (id) => {
        setSuggestions([]);
        setSearch("")
        navigate(`/item/${id}`);
    }

    return (
        <div className="nav">
            <nav className="nav-container">
                <img className="nav-logo" onClick={() => navigate("/")} />
                {!userCtx.isLoggedIn && <NavLink to="/login">התחברות</NavLink>}
                <NavLink to="/recepies">מתכונים</NavLink>
                {userCtx.isLoggedIn && (
                    <NavLink to="/" onClick={() => userCtx.logout()}>
                        התנתק
                    </NavLink>
                )}
                {userCtx.isLoggedIn && <NavLink to="/recepie">הוסף מתכון</NavLink>}
                <input
                    className="nav-search"
                    type="text"
                    placeholder="אני רוצה לחפש...."
                    value={search}
                    onChange={(e) => onSearchHandler(e.target.value)}
                />
                {suggestions &&
                    <div className="nav-suggestions">
                        {suggestions.map((item) => <p onClick={() => onClickSuggestionHandler(item._id)}>{item.title}</p>)}
                    </div>
                }
            </nav>
        </div>
    );
};

export default Nav;
