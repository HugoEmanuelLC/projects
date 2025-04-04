// Dependencies
import { useState, useEffect } from 'react';
import { Splide, SplideTrack, SplideSlide } from '@splidejs/react-splide';
// slider images
import '@splidejs/react-splide/css';

// Images
import facade from '/website/gallery-local-component/facade.webp';
import tablesexterieurs from '/website/gallery-local-component/tablesexterieurs.webp';
import tablesinterieur from '/website/gallery-local-component/tablesinterieur.webp';

// Script
import { urlServer } from "../../../authentication/scripts/fetch-urls";



function GalleryLocalComponent(props){
    const [ images, setImages ] = useState(props.imageSectionGalleryLocation);
    const [gallery, setGallery] = useState({
        image1: null, 
        image2: null, 
        image3: null,
    });

    const traitementImages = (images) => {
        images.map((image) => {
            if (image.sectionGalleryLocation_1 === 1) {
                setGallery((prev) => {
                    return {
                        ...prev,
                        image1: urlServer + "/images/uploads/resized/"+ image.image_name
                    }
                })
            }
            if (image.sectionGalleryLocation_2 === 1) {
                setGallery((prev) => {
                    return {
                        ...prev,
                        image2: urlServer + "/images/uploads/resized/"+ image?.image_name
                    }
                })
            }
            if (image.sectionGalleryLocation_3 === 1) {
                setGallery((prev) => {
                    return {
                        ...prev,
                        image3: urlServer + "/images/uploads/resized/"+ image?.image_name
                    }
                })
            }
        })
    }

    useEffect(() => {
        console.log("gallery : ");
        console.log(images);
        console.log("test images : ---------------");
        traitementImages(images)
    }, [images]);



    return (
        <section id="gallery_local_component" >
            <div className="content container">

                <Splide hasTrack={false}
                    options={ {
                        rewind: true,
                        type       : 'loop',
                        // perPage    : 1,
                        // perMove    : 1,
                        // gap        : '1rem',
                        // pagination : true,
                        arrows     : true,
                        autoplay   : true,
                        interval   : 5000,
                        pauseOnHover: true,
                        speed      : 300,
                        easing     : 'ease',
                    } }
                >
                    <SplideTrack>
                        <SplideSlide>
                            <div className="box_space_image" style={gallery?.image1 ? {"backgroundImage": "url('"+gallery?.image1+"')"} : {}}>
                                <div className="box_space_shadow_image"></div>
                            </div>
                        </SplideSlide>
                        <SplideSlide>
                            <div className="box_space_image" style={gallery?.image2 ? {"backgroundImage": "url('"+gallery?.image2+"')"} : {}}>
                                <div className="box_space_shadow_image"></div>
                            </div>
                        </SplideSlide>
                        <SplideSlide>
                            <div className="box_space_image" style={gallery?.image3 ? {"backgroundImage": "url('"+gallery?.image3+"')"} : {}}>
                                <div className="box_space_shadow_image"></div>
                            </div>
                        </SplideSlide>
                    </SplideTrack>
                    <div className="splide__arrows"></div>
                </Splide>
            </div>
        </section>
    )
}

export default GalleryLocalComponent;