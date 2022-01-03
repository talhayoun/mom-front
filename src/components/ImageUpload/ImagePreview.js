import React, { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { IoMdTrash } from "react-icons/io";

const ImagePreview = (props) => {
    const { image, setImage } = props;
    const [imagePreview, setImagePreview] = useState("");

    useEffect(() => {
        console.log(image);
        if (image?.length > 0 && typeof image !== 'string') {
            let [file] = image;
            file["id"] = nanoid();
            setImagePreview(URL.createObjectURL(file));
        } else {
            setImagePreview(`${process.env.REACT_APP_SERVER_API}/image/${image}`)
        }
    }, [image]);

    const deleteImage = () => {
        setImage("");
        setImagePreview("");
    };

    const handleOnChangeImage = (event) => {
        if (event.target.files) setImage(event.target.files);
    };

    return (
        <div className="imagePreview">
            <div className="imagePreview-container">
                <div>+</div>
                <p>העלאת תמונות</p>
            </div>
            <input type="file" onChange={(e) => handleOnChangeImage(e)} />
            {image && (
                <div className="imagePreview-img-container">
                    <div>
                        <img src={imagePreview} alt="" />
                    </div>
                    <div className="imagePreview-deleteContainer">
                        <div className="imagePreview-deleteContainer-first">
                            {
                                <IoMdTrash
                                    fontSize={25}
                                    style={{ marginTop: 10 }}
                                    onClick={deleteImage}
                                />
                            }
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ImagePreview;
