import { useEffect, useRef } from 'react';
import AboutUs from '../components/AboutUs';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import HomeNavbar from '../components/HomeNavbar';
import Team from '../components/Team';
import TechGrid from '../components/TechGrid';
import "../components/style/home.css";
import InfoGrid from '../components/InfoGrid';

function Homepage() {
  const scriptRef = useRef(null);

  useEffect(() => {
    scriptRef.current = document.createElement('script');
    scriptRef.current.src = 'https://cdn.jsdelivr.net/npm/masonry-layout@4.2.2/dist/masonry.pkgd.min.js';
    scriptRef.current.integrity = 'sha384-GNFwBvfVxBkLMJpYMOABq3c+d3KnQxudP/mGPkzpZSTYykLBNsZEnG2D9G/X/+7D';
    scriptRef.current.crossOrigin = 'anonymous';
    scriptRef.current.async = true;
    document.body.appendChild(scriptRef.current);

    return () => {
      if (scriptRef.current) {
        document.body.removeChild(scriptRef.current);
        scriptRef.current = null;
      }
    };
  }, []);

  return (
    <div className="App">
      {/* <HomeNavbar/> */}
      <Hero/>
      <InfoGrid/>
      <AboutUs/>
      <TechGrid/>
      <Team/>
      <Footer/>
    </div>
  );
}

export default Homepage;
