// Dependencies
import { useState, useEffect, use} from 'react';

// Components
import Popup, { ConfimationDelete } from '../../components/popup-component/popup-component';

// Script
import { imageCreate, selectListImages, imageUpdate, imageDelete } from './images-page-script';
import { urlServerImages } from '../../../authentication/scripts/fetch-urls';


function ImagesPage() {
    const [ file, setFile ] = useState()
    const [ images, setImages ] = useState([])
    const [ delitedMenuPopup, setDelitedMenuPopup ] = useState(null)

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
                            <img src={urlServerImages+"/images/uploads/resized/"+image.image_name} alt="" />
                            <h3>{image.image_name}</h3>
                            <p>{image.image_date.slice(0, 10)}</p>
                            <JointureImagesSections image={image} 
                                handleSelectListImages={handleSelectListImages} 
                                setDelitedMenuPopup={setDelitedMenuPopup} />
                        </div>
                    )
                })}

                {
                    delitedMenuPopup !== null &&
                    <Popup closePopup={() => setDelitedMenuPopup(null)}>
                        <ConfimationDelete 
                            datas={
                                {
                                    id: delitedMenuPopup.image_id,
                                    name: delitedMenuPopup.image_name
                                }
                            }
                            txt="l'image"
                            selectDatas={handleSelectListImages}
                            msg="Image supprimé"
                            closePopup={()=>setDelitedMenuPopup(null)}
                            fnc={imageDelete}
                        />
                    </Popup>
                }
            </div>
        </section>
    );
}

export default ImagesPage;







function JointureImagesSections(props) {
    let listSections = [
        {name: "sectionHero", checked: false, txt: "first image of website"},
        {name: "section4images_1", checked: false, txt: "image 1 of 4 gallery images"},
        {name: "section4images_2", checked: false, txt: "image 2 of 4 gallery images"},
        {name: "section4images_3", checked: false, txt: "image 3 of 4 gallery images"},
        {name: "section4images_4", checked: false, txt: "image 4 of 4 gallery images"},
        {name: "sectionGalleryLocation_1", checked: false, txt: "image 1 of gallery location"},
        {name: "sectionGalleryLocation_2", checked: false, txt: "image 2 of gallery location"},
        {name: "sectionGalleryLocation_3", checked: false, txt: "image 3 of gallery location"},
        {name: "sectionLogo", checked: false, txt: "logo of website"},
    ]
    const [sectionsFromImages, setSectionsFromImages] = useState([]);
    const [ sectionsSelected, setSectionsSelected ] = useState([])

    const [ isSent, setIsSent ] = useState(null)

    const handleUpdateSectionInDB = async () => {
        let datas = {
            tableName: [],
            value: []
        }

        sectionsSelected.map((section) => {
            if (section.checked !== sectionsFromImages.find((s) => s.name === section.name)?.checked) {
                datas.tableName.push(section.name)
                datas.value.push(section.checked)
            }
        })

        await imageUpdate(props.image.image_id, datas)
        .then((res) => {
            setIsSent("edit successfully")
            return setTimeout(() => {
                setIsSent(null)
                setSectionsFromImages([...sectionsSelected])
                // setSectionsSelected([...sectionsSelected])
                // props.handleSelectListImages()
            }, 2000);
        })
        .catch((err) => {
            setIsSent(err.message)
            return setTimeout(() => {
                setIsSent(null)
            }, 2000);
        });
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

    useEffect(() => {
        let tabtampon = []
        listSections.map((section) => {
            tabtampon.push({ name: section.name, checked: props.image[section.name] })
        })

        sectionsFromImages.length == 0 && setSectionsFromImages([...tabtampon])
        sectionsSelected.length == 0 && setSectionsSelected([...tabtampon])
    }, []);

    return (
        <div className="jointure_images_sections">
            <fieldset>
                {/* <legend>Zones</legend> */}
                {
                    sectionsSelected?.map((section, index) => {
                        return (
                            <div key={index} className='section'>
                                <label htmlFor={section.name}>{
                                    listSections.find((s) => s.name === section.name)?.txt    
                                }</label>
                                <input type="checkbox" 
                                    name={section.name} id={section.name} 
                                    onChange={handleSectionSelected} 
                                    checked={sectionsSelected.find((s) => s.name === section.name)?.checked } 
                                />
                            </div>
                        )
                    })
                }
            </fieldset>

            { isSent && <div className='isSent'> {isSent} </div> }

            <div className="buttons">
                <button onClick={()=>props.setDelitedMenuPopup(props.image)}>
                    <i className='bx bx-trash'></i>
                </button>
                
                <button onClick={handleUpdateSectionInDB}>
                    <i className='bx bx-send'></i>
                </button> 
            </div>
            
        </div>
    )
}