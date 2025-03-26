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



function Home() {
    const [ loading, setLoading ] = useState(true)

    const handleLoading = () => {
        setLoading(true)
        let timer = setTimeout(() => {
            setLoading(false)
        }, 1000)
        return () => clearTimeout(timer)
    }

    useEffect(() => {
        loading == true && handleLoading()
    }, [])

    return (
        loading ? <LoadingComponent /> : 
        <div id='home_page'>
            <HeroComponent />
            <div className="bloc_after_hero">
                <AboutComponent />
                <GalleryComponent />
                <TimetableComponent />
                <GalleryLocalComponent />
                <LocationComponent />
                <FooterComponent />
            </div>
        </div>
    )
}

export default Home;