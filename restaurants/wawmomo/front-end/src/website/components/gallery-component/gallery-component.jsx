// Dependencies
import { useEffect, useState, useRef } from 'react';

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

    const sectionTag = useRef(null);
    
    const handleHideSectionTag = () => {
        if (gallery.image1 === null && gallery.image2 === null && gallery.image3 === null && gallery.image4 === null) {
            sectionTag.current.classList.add('hideSection');
        }
        else {
            sectionTag.current.classList.remove('hideSection');
        }
    };

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
        traitementImages()
    }, [images]);

    useEffect(() => {
        handleHideSectionTag();
    }, [gallery]);


    return (
        <section ref={sectionTag} className="gallery_component">
            <div className="gallery container">

                <div className="gallery_item big_small">
                    <div className="img">
                        {gallery.image1 && <img src={gallery.image1} alt="gallery item" />}
                    </div>
                    
                    <div className="img">
                        {gallery.image2 && <img src={gallery.image2} alt="gallery item" />}
                    </div>
                    
                </div>

                <div className="gallery_item small_big">
                    <div className="img">
                        {gallery.image3 && <img src={gallery.image3} alt="gallery item" />}
                    </div>
                    
                    <div className="img">
                        {gallery.image4 && <img src={gallery.image4} alt="gallery item" />}
                    </div>
                </div>

            </div>
        </section>
    );
}

export default GalleryComponent;