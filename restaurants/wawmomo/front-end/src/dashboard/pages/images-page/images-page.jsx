// Dependencies
import { useState, useEffect, use} from 'react';

// Script
import { imageCreate, selectListImages, imageUpdate, imageDelete } from './images-page-script';
import { urlServer } from '../../../authentication/scripts/fetch-urls';


function ImagesPage() {
    const [ file, setFile ] = useState()
    const [ images, setImages ] = useState([])

    const handleSelectListImages = async () => {
        await selectListImages()
        .then((res) => {
            console.log("--------------- res : ", res);
            setImages(res);
        })
        .catch((err) => {
            console.error("--------------- err : ", err );
            setImages([]);
        });
    }

    const handleImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setFile(event.target.files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await imageCreate(file)
        .then((res) => {
            console.log("Image create res : ", res);
            handleSelectListImages()
        })
        .catch((err) => {
            console.error("Image create err : ", err );
        });
    }

    useEffect(() => {
        images.length == 0 && handleSelectListImages()
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
            
            <div className="list_head_links">
                <form encType="multipart/form-data">
                    <input type="file" name="file" id="file" onChange={handleImageChange} />
                    <button onClick={handleSubmit}>Upload</button>
                </form>
            </div>

            <div className="images_container list_datas">
                {images && images.map((image, index) => {
                    return (
                        <div className="card" key={index}>
                            <img src={urlServer+"/images/uploads/resized/"+image.image_name} alt="" />
                            <h3>{image.image_name}</h3>
                            <p>{image.image_date}</p>
                            <JointureImagesSections image={image} handleSelectListImages={handleSelectListImages} />
                        </div>
                    )
                })}
            </div>
        </section>
    );
}

export default ImagesPage;







function JointureImagesSections(props) {
    let listSections = [
        {name: "sectionHero", checked: false },
        {name: "section4images_1", checked: false },
        {name: "section4images_2", checked: false },
        {name: "section4images_3", checked: false },
        {name: "section4images_4", checked: false },
        {name: "sectionGalleryLocation_1", checked: false },
        {name: "sectionGalleryLocation_2", checked: false },
        {name: "sectionGalleryLocation_3", checked: false },
    ]
    const [sectionsFromImages, setSectionsFromImages] = useState([]);
    
    const [ sectionsSelected, setSectionsSelected ] = useState([])

    const handleUpdateSectionInDB = async () => {
        let datas = {
            tableName: [],
            value: []
        }

        console.log("sectionsFromImages : ");
        console.log(sectionsFromImages);
        console.log("sectionsSelected : ");
        console.log(sectionsSelected);

        sectionsSelected.map((section) => {
            if (section.checked !== sectionsFromImages.find((s) => s.name === section.name)?.checked) {
                datas.tableName.push(section.name)
                datas.value.push(section.checked)
            }
        })

        console.log("datas : ");
        console.log(datas.tableName);
        console.log(datas.value);
        console.log("datas : ");

        await imageUpdate(props.image.image_id, datas)
    }

    const handleSectionSelected = (e) => {
        const { name, checked } = e.target;
        setSectionsSelected((prevSections) => {
            return prevSections.map((section) => {
                if (section.name === name) {
                    return { ...section, checked: section.checked == 0 ? 1 : 0 };
                }
                return section;
            });
        })    
    }

    const handleDeleteImage = async () => {
        await imageDelete( props.image.image_id, props.image.image_name )
        .then((res) => {
            console.log("Image delete res : ", res);
        })
        .catch((err) => {
            console.error("Image delete err : ", err );
        });
        props.handleSelectListImages()
    }

    useEffect(() => {
        let tabtampon = []
        listSections.map((section) => {
            tabtampon.push({ name: section.name, checked: props.image[section.name] })
        })
        
        sectionsFromImages.length == 0 && 
        setSectionsFromImages([...tabtampon])
        setSectionsSelected([...tabtampon])
    }, []);

    useEffect(() => {
        console.log("------------------------------ tabtampon : ");
        console.log(sectionsSelected);
        console.log("------------------------------ tabtampon : ");
    }, [sectionsSelected]);

    return (
        <div className="jointure_images_sections">
            <button onClick={handleDeleteImage}>Supprimer</button>
            <fieldset>
                <legend>Sections</legend>
                {
                    sectionsSelected?.map((section, index) => {
                        return (
                            <div key={index}>
                                <input type="checkbox" 
                                    name={section.name} id={section.name} 
                                    // onClick={()=>handleUpdateSectionInDB(section.name)} 
                                    onChange={handleSectionSelected} 
                                    checked={sectionsSelected.find((s) => s.name === section.name)?.checked } 
                                />
                                <label htmlFor={section.name}>{section.name}</label><br />
                            </div>
                        )
                    })
                }
            </fieldset>
            
            <button onClick={handleUpdateSectionInDB}>Modifier</button>
        </div>
    )
}