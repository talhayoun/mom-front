import { Fab, IconButton } from "@mui/material";
import { useState } from "react";
import { IoMdAdd, IoMdTrash } from "react-icons/io";
import BlackScreen from "../ui/Blackscreen";

const ItemsList = (props) => {
    const { title, onChangeHandler, list, closeModal } = props;

    const [item, setItem] = useState();

    const onAddHandler = () => {
        if (item.length === 0) return;

        onChangeHandler((currentList) => [...currentList, item]);

        setItem("");
    };

    const removeItemHandler = (removeItemValue) => {
        const updatedList = list.filter((item, index) => index !== removeItemValue)
        onChangeHandler(updatedList)
    }

    return (
        <>
            <BlackScreen onClick={() => closeModal(false)} />
            <div className="itemslist">
                <span className="itemslist-close" onClick={() => closeModal(false)}>X</span>
                <h3>{title}</h3>
                <ul>
                    {list &&
                        list.map((item, index) => (
                            <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
                                <li>{item}</li>
                                <IconButton aria-label="delete" size="small" onClick={() => removeItemHandler(index)}>
                                    <IoMdTrash />
                                </IconButton>
                            </div>
                        ))}
                </ul>
                <div className="itemslist-add">
                    <input
                        placeholder="מה תרצה להוסיף?"
                        value={item}
                        onChange={(e) => setItem(e.target.value)}
                    />
                    <Fab
                        color="primary"
                        aria-label="add"
                        style={{ height: 35, width: 35, marginRight: 20 }}
                        onClick={onAddHandler}
                    >
                        <IoMdAdd fontSize={20} />
                    </Fab>
                </div>
            </div>
        </>
    );
};

export default ItemsList;
