// Dependencies
import { useEffect, useState } from "react";

// Images
import momos_bckg from '/website/hero-component/momos_bckg.jpg';
import BtnsComponent from "../btns-component/btns-component";

// Script
import { urlServer } from "../../../authentication/scripts/fetch-urls";


function HeroComponent(props) {
    const [images, setImages] = useState({
        momos_bckg,
        image: urlServer + "/images/uploads/resized/"+props?.imageSectionHero[0]?.image_name
    });

    useEffect(() => {
        console.log("props.imageSectionHero : ");
        console.log(props.imageSectionHero);
        console.log(images.image);
    }, []);

    return (
        <section className='hero_component'
            style={{"backgroundImage": `url(${images?.image} )`}}
        >
            <div className="block_shadow">
                <div className="container">
                    <div className="text">
                        <h1>sandwicherie <br/> petite restauration  <br/> take away</h1>
                    </div>

                    
                    <div className="btn_ubereats">
                        <BtnsComponent>
                            <a title="Commander par telephone" href="TEL:02.203.43.00"> 
                                <i className='bx bxs-phone'></i> 
                                &nbsp;02.203.43.00
                            </a>
                        </BtnsComponent>
                        
                        <BtnsComponent>
                            <a title="Faites vous livrer" href="https://www.ubereats.com/be/store/waw-momo/cSUvNUqGX5Kl3r0X5ZDNEg"> 
                                <i className='bx bxs-package' ></i>
                                &nbsp;uber eats
                            </a>
                        </BtnsComponent>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HeroComponent;