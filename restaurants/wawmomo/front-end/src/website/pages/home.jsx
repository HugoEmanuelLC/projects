// Dependencies
import { useEffect, useState } from "react";

// Components
import AboutComponent from "../components/about-component/about-component";
import GalleryComponent from "../components/gallery-component/gallery-component";
import HeroComponent from "../components/hero-component/hero-component";
import TimetableComponent from "../components/timetable-component/timetable-component";
import GalleryLocalComponent from "../components/gallery-local-component/gallery-local-component";
import LocationComponent from "../components/location-component/location-component";
import FooterComponent from "../components/footer-component/footer-component";
import LoadingComponent from "../components/loading-component/loading-component";

// Script
import { imagesList } from "./home-page-script";
import { urlServer } from "../../authentication/scripts/fetch-urls";



function Home() {
    const [ loading, setLoading ] = useState(true)

    const [ imageSectionHero, setImageSectionHero ] = useState([]);
    const [ imageSection4images_1, setImageSection4images_1 ] = useState([]);
    const [ imageSection4images_2, setImageSection4images_2 ] = useState([]);
    const [ imageSection4images_3, setImageSection4images_3 ] = useState([]);
    const [ imageSection4images_4, setImageSection4images_4 ] = useState([]);
    const [ imageSectionGalleryLocation_1, setImageSectionGalleryLocation_1 ] = useState([]);
    const [ imageSectionGalleryLocation_2, setImageSectionGalleryLocation_2 ] = useState([]);
    const [ imageSectionGalleryLocation_3, setImageSectionGalleryLocation_3 ] = useState([]);
    const [ imageSectionLogo, setImageSectionLogo ] = useState([]);

    const handleLoading = () => {
        setLoading(true)
        let timer = setTimeout(() => {
            setLoading(false)
        }, 1000)
        return () => clearTimeout(timer)
    }

    const handleImagesList = async () => {
        await imagesList()
        .then((res) => {
            console.log("res : ", res);
            res.map((image) => {
                if (image.sectionHero === 1) {
                    setImageSectionHero((prev) => {
                        return [...prev, image]
                    })
                }
                if (image.section4images_1 === 1) {
                    setImageSection4images_1((prev) => {
                        return [...prev, image]
                    })
                }
                if (image.section4images_2 === 1) {
                    setImageSection4images_2((prev) => {
                        return [...prev, image]
                    })
                }
                if (image.section4images_3 === 1) {
                    setImageSection4images_3((prev) => {
                        return [...prev, image]
                    })
                }
                if (image.section4images_4 === 1) {
                    setImageSection4images_4((prev) => {
                        return [...prev, image]
                    })
                }
                if (image.sectionGalleryLocation_1 === 1) {
                    setImageSectionGalleryLocation_1((prev) => {
                        return [...prev, image]
                    })
                }
                if (image.sectionGalleryLocation_2 === 1) {
                    setImageSectionGalleryLocation_2((prev) => {
                        return [...prev, image]
                    })
                }
                if (image.sectionGalleryLocation_3 === 1) {
                    setImageSectionGalleryLocation_3((prev) => {
                        return [...prev, image]
                    })
                }
                if (image.sectionLogo === 1) {
                    setImageSectionLogo((prev) => {
                        return [...prev, image]
                    })
                }
            })
        })
        .catch((err) => {
            console.error("Err : ", err);
        });
    }

    useEffect(() => {
        loading == true && handleLoading()
    }, [])


    useEffect( () => {
        handleImagesList()
    }, []);

    useEffect(() => {
        
        let link = document.querySelector("link[rel~='icon']");
        if (link) {
            link.href = urlServer+"/images/uploads/resized/"+imageSectionLogo[0]?.image_name;
        } else {
            link = document.createElement("link");
            link.rel = "icon";
            link.href = urlServer+"/images/uploads/resized/"+imageSectionLogo[0]?.image_name;
            document.head.appendChild(link);
        }
    }, [imageSectionLogo]);




    return (
        loading ? <LoadingComponent /> : 
        <div id='home_page'>
            <HeroComponent imageSectionHero={imageSectionHero} />
            <div className="bloc_after_hero">
                <AboutComponent />
                <GalleryComponent imageSection4images={
                    imageSection4images_1.concat(imageSection4images_2, imageSection4images_3, imageSection4images_4)
                } />
                <TimetableComponent />
                <GalleryLocalComponent imageSectionGalleryLocation={
                    imageSectionGalleryLocation_1.concat(imageSectionGalleryLocation_2, imageSectionGalleryLocation_3)
                } />
                <LocationComponent />
                <FooterComponent />
            </div>
        </div>
    )
}

export default Home;