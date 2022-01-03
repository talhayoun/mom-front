import { Fragment } from "react";
import RecepieItem from "./RecepieItem";

const RecepiesList = (props) => {
    const { recepies } = props;

    if (recepies.length === 0) {
        return (
            <h1>לא קיימים מתכונים</h1>
        )
    }

    return (
        <Fragment>
            {recepies &&
                recepies.map((item) => (
                    <RecepieItem
                        key={item._id}
                        title={item.title}
                        time={item.time}
                        id={item._id}
                        image={item.image}
                    />
                ))}
        </Fragment>
    );
};

export default RecepiesList;

