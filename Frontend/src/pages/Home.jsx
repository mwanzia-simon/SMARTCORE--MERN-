import AboutUs from "../components/AboutUs";
import BestSeller from "../components/BestSeller";
import Categories from "../components/Categories";
import Hero from "../components/Hero";
import NewsLetter from "../components/NewsLetter";
import Testimonials from "../components/Testimonials";

const Home = () => {
  return (
    <div className="min-h-screen bg-sc-main">
      <Hero/>
      <Categories/>
      <BestSeller/>
      <AboutUs/>
      <Testimonials/>
      <NewsLetter/>
    </div>
  );
};

export default Home;
