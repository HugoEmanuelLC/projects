// Components
import AboutComponent from "../components/about-component/about-component";
import GalleryComponent from "../components/gallery-component/gallery-component";
import HeroComponent from "../components/hero-component/hero-component";



function Home() {

    return (
        <div id='home_page'>
            <HeroComponent />
            <AboutComponent />
            <GalleryComponent />
        </div>
    )
}

export default Home;