// Dependencies
import { useState, useEffect} from 'react';

// Script
import { imageCreate, imageSelect } from './images-page-script';


function ImagesPage() {
    const [ createNewElementPopup, setCreateNewElementPopup ] = useState(null)
    const [ file, setFile ] = useState()
    const [ images, setImages ] = useState([])

    const handleImageSelect = async () => {
        await imageSelect()
        .then((res) => {
            console.log("Image select res : ", res);
            setImages(res);
        })
        .catch((err) => {
            console.error("Image select err : ", err );
        });
    }

    const handleImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            // console.log(event.target.files[0]);
            setFile(event.target.files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // const formData = new FormData();
        // formData.append('file', file);
        console.log(file);
        
        await imageCreate(file)
        .then((res) => {
            console.log("Image create res : ", res);
            // setImages([...images, res.path])
            handleImageSelect()
        })
        .catch((err) => {
            console.error("Image create err : ", err );
        });
    }

    useEffect(() => {
        images.length == 0 && handleImageSelect()
    }, []);

    useEffect(() => {
        return () => {
            console.log("Images page unmount")
            console.log(file);
        }
    }, [file])

    return (
        <section id="images_page" className="box_content_settings">
            {/* <div className="btn_new_add" onClick={()=>setCreateNewElementPopup(true)}>Ajouter menu</div> */}

            <form encType="multipart/form-data">
                <input type="file" name="file" id="file" onChange={handleImageChange} />
                <button onClick={handleSubmit}>Upload</button>
            </form>

            {/* <img src={file && file} alt="" /> */}

            {
                images.length > 0 ? images.map((image, index) => {
                    return (
                        <div key={index}>
                            <img src={"http://localhost:3001/images/uploads/resized/"+image.image_name} alt="image" />
                        </div>
                    )
                }) : null
            }
        </section>
    );
}

export default ImagesPage;