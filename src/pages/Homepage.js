import AboutUs from '../components/AboutUs';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import HomeNavbar from '../components/HomeNavbar';
import Team from '../components/Team';
import TechGrid from '../components/TechGrid';
import "../components/style/home.css";

function Homepage() {
  return (
    <div className="App">
      <HomeNavbar/>
       <Hero/>
       <hr/>
       <AboutUs/>
      <TechGrid/>
      <Team/>
      <Footer/>
       
    </div>
  );
}

export default Homepage;
