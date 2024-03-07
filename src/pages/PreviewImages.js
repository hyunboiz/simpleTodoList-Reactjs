import { useState,useEffect } from "react";

function PreviewImage(){

    const [image, setImage] = useState();

    useEffect(() =>{
      
      return () => {
        image && URL.revokeObjectURL(image.preview);
      }
    } ,[image])
  
    const handleImage = (e) => {
        const file = e.target.files[0];
        file.preview = URL.createObjectURL(file);
        setImage(file);
    }
    return(
        <div>
            <input type="file" onChange={handleImage}></input>
  
            {image && (
                <img src={image.preview} />
                )
            }
        </div>
    )
} 

export default PreviewImage;