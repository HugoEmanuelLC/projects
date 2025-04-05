// Dependencies
import { useEffect, useState } from 'react';

// Script
import { urlServer } from "../../../authentication/scripts/fetch-urls";


function GalleryComponent(props) {
    const [ images, setImages ] = useState(props.imageSection4images);
    const [gallery, setGallery] = useState({
        image1: null,
        image2: null,
        image3: null,
        image4: null,
    });

    const traitementImages = () => {
        images.map((image) => {
            if (image.section4images_1 === 1) {
                setGallery((prev) => {
                    return {
                        ...prev,
                        image1: urlServer + "/images/uploads/resized/"+ image?.image_name
                    }
                })
            }
            if (image.section4images_2 === 1) {
                setGallery((prev) => {
                    return {
                        ...prev,
                        image2: urlServer + "/images/uploads/resized/"+ image?.image_name
                    }
                })
            }
            if (image.section4images_3 === 1) {
                setGallery((prev) => {
                    return {
                        ...prev,
                        image3: urlServer + "/images/uploads/resized/"+ image?.image_name
                    }
                })
            }
            if (image.section4images_4 === 1) {
                setGallery((prev) => {
                    return {
                        ...prev,
                        image4: urlServer + "/images/uploads/resized/"+ image?.image_name
                    }
                })
            }
        })
    }

    useEffect(() => {
        console.log("gallery : ");
        console.log(images);
        console.log("test images : ---------------");
        traitementImages()
    }, [images]);


    return (
        <section className="gallery_component">
            <div className="gallery container">

                <div className="gallery_item big_small">
                    <div className="img">
                        <img src={gallery.image1} alt="gallery item" />
                    </div>
                    
                    <div className="img">
                        <img src={gallery.image2} alt="gallery item" />
                    </div>
                    
                </div>

                <div className="gallery_item small_big">
                    <div className="img">
                        <img src={gallery.image3} alt="gallery item" />
                    </div>
                    
                    <div className="img">
                        <img src={gallery.image4} alt="gallery item" />
                    </div>
                </div>

            </div>
        </section>
    );
}

export default GalleryComponent;