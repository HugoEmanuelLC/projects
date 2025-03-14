// Dependencies
import { useEffect, useState } from 'react';

// Images
import massala from '/website/gallery-component/massala.jpg';
import samosa from '/website/gallery-component/samosa.jpg';
import momos from '/website/gallery-component/momos.jpg';
import paninis from '/website/gallery-component/paninis.jpg';


function GalleryComponent() {
    const [gallery, setGallery] = useState({
        massala,
        samosa,
        momos,
        paninis
    });


    return (
        <section className="gallery_component">
            <div className="gallery container">

                <div className="gallery_item big_small">
                    <div className="img">
                        <img src={gallery?.massala} alt="gallery item" />
                    </div>
                    
                    <div className="img">
                        <img src={gallery?.samosa} alt="gallery item" />
                    </div>
                    
                </div>

                <div className="gallery_item small_big">
                    <div className="img">
                        <img src={gallery?.momos} alt="gallery item" />
                    </div>
                    
                    <div className="img">
                        <img src={gallery?.paninis} alt="gallery item" />
                    </div>
                </div>

            </div>
        </section>
    );
}

export default GalleryComponent;