// Dependencies
import { useEffect, useState } from "react";

// Images
import momos_bckg from '/website/hero-component/momos_bckg.jpg';
import BtnsComponent from "../btns-component/btns-component";


function HeroComponent() {
    const [images, setImages] = useState({
        momos_bckg
    });

    // useEffect(() => {
    //     setImages({
    //         momos_bckg
    //     });
    // }, []);

    return (
        <section className='hero_component'
            style={{"backgroundImage": `url(${images?.momos_bckg})`}}
        >
            <div className="block_shadow">
                <div className="container">
                    <div className="text">
                        <h1>sandwicherie <br/> petite restauration  <br/> take away</h1>
                    </div>

                    
                    <div className="btn_ubereats">
                        <BtnsComponent>
                            <a href="TEL:02.203.43.00"> <i className='bx bxs-phone-outgoing'></i> commender</a>
                        </BtnsComponent>
                        
                        <BtnsComponent>
                            <a href="https://www.ubereats.com/be/store/waw-momo/cSUvNUqGX5Kl3r0X5ZDNEg"> <i className='bx bx-shopping-bag'></i> uber eats</a>
                        </BtnsComponent>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HeroComponent;