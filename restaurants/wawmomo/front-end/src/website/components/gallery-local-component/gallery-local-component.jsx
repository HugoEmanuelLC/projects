// Dependencies
import { useState } from 'react';
import { Splide, SplideTrack, SplideSlide } from '@splidejs/react-splide';
// slider images
import '@splidejs/react-splide/css';

// Images
import facade from '/website/gallery-local-component/facade.webp';
import tablesexterieurs from '/website/gallery-local-component/tablesexterieurs.webp';
import tablesinterieur from '/website/gallery-local-component/tablesinterieur.webp';


function GalleryLocalComponent(){
    const [images, setImages] = useState({facade, tablesexterieurs, tablesinterieur});

    return (
        <section id="gallery_local_component" >
            <div className="content container">
                {/* <div className="box_space_image" style={images?.facade ? {"backgroundImage": "url('"+images?.facade+"')"} : {}}>
                    <div className="box_space_shadow_image"></div>
                </div>

                <div className="box_space_image" style={images?.tablesexterieurs ? {"backgroundImage": "url('"+images?.tablesexterieurs+"')"} : {}}>
                    <div className="box_space_shadow_image"></div>
                </div>

                <div className="box_space_image" style={images?.tablesinterieur ? {"backgroundImage": "url('"+images?.tablesinterieur+"')"} : {}}>
                    <div className="box_space_shadow_image"></div>
                </div> */}

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
                            <div className="box_space_image" style={images?.facade ? {"backgroundImage": "url('"+images?.facade+"')"} : {}}>
                                <div className="box_space_shadow_image"></div>
                            </div>
                        </SplideSlide>
                        <SplideSlide>
                            <div className="box_space_image" style={images?.tablesexterieurs ? {"backgroundImage": "url('"+images?.tablesexterieurs+"')"} : {}}>
                                <div className="box_space_shadow_image"></div>
                            </div>
                        </SplideSlide>
                        <SplideSlide>
                            <div className="box_space_image" style={images?.tablesinterieur ? {"backgroundImage": "url('"+images?.tablesinterieur+"')"} : {}}>
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