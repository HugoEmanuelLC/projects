// Components
import AboutComponent from "../components/about-component/about-component";
import GalleryComponent from "../components/gallery-component/gallery-component";
import HeroComponent from "../components/hero-component/hero-component";
import TimetableComponent from "../components/timetable-component/timetable-component";
import GalleryLocalComponent from "../components/gallery-local-component/gallery-local-component";
import LocationComponent from "../components/location-component/location-component";
import FooterComponent from "../components/footer-component/footer-component";



function Home() {

    return (
        <div id='home_page'>
            <HeroComponent />
            <div className="bloc_after_hero">
                <AboutComponent />
                <GalleryComponent />
                <GalleryLocalComponent />
                <TimetableComponent />
                <LocationComponent />
                <FooterComponent />
            </div>
        </div>
    )
}

export default Home;