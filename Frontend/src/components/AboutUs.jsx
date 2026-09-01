import { hero_svg_2 } from "../assets/assets"

const AboutUs = () => {
  return (
    <div className="container  p-2 grid grid-cols-1 md:grid-cols-2 items-center mt-10">
        <div className="p-3">
            <h1 className="text-3xl text-primary font-bold mb-2">Power at the center of performance.</h1>
            <p className="text-secondary text-justify">At SmartCore, we believe technology is more than just hardware it is the foundation of innovation, productivity, and growth. Our mission is to provide high-performance laptops that empower students, professionals, creators, and developers to push boundaries and achieve more. We understand that the right machine can transform the way you work, learn, and create. That’s why we carefully select laptops that combine power, reliability, and modern design.</p>
        </div>
        <div className="p-3">
            <img src={hero_svg_2} alt="aboutus image"  className="w-[80%] md:w-96 mx-auto"/>
        </div>
    </div>
  )
}

export default AboutUs