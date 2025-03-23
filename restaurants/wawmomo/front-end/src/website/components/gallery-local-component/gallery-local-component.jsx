// Dependencies
import { useState } from 'react';

// Images
import facade from '/website/gallery-local-component/facade.webp';
import tablesexterieurs from '/website/gallery-local-component/tablesexterieurs.webp';
import tablesinterieur from '/website/gallery-local-component/tablesinterieur.webp';


function GalleryLocalComponent(){
    const [images, setImages] = useState({facade, tablesexterieurs, tablesinterieur});

    return (
        <section id="gallery_local_component" >
            <div className="content">
                <div className="box_space_image" style={images?.facade ? {"backgroundImage": "url('"+images?.facade+"')"} : {}}>
                    <div className="box_space_shadow_image"></div>
                </div>

                <div className="box_space_image" style={images?.tablesexterieurs ? {"backgroundImage": "url('"+images?.tablesexterieurs+"')"} : {}}>
                    <div className="box_space_shadow_image"></div>
                </div>

                <div className="box_space_image" style={images?.tablesinterieur ? {"backgroundImage": "url('"+images?.tablesinterieur+"')"} : {}}>
                    <div className="box_space_shadow_image"></div>
                </div>
            </div>
        </section>
    )
}

export default GalleryLocalComponent;