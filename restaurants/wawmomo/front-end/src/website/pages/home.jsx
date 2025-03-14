// Components
import AboutComponent from "../components/about-component/about-component";
import GalleryComponent from "../components/gallery-component/gallery-component";
import HeroComponent from "../components/hero-component/hero-component";
import TimetableComponent from "../components/timetable-component/timetable-component";



function Home() {

    return (
        <div id='home_page'>
            <HeroComponent />
            <AboutComponent />
            <GalleryComponent />
            <TimetableComponent />
        </div>
    )
}

export default Home;