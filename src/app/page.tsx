import CTA from "@/components/CTA";
import HorizontalSlider from "@/components/landing/HorzontilSlider";
import AreasOfFocus from "@/components/landing/AreasOfFocus";
import Hero from "@/components/landing/Hero";
import Location from "@/components/landing/Location";
import Testimonial from "@/components/landing/Testimonial";
import WhyUs from "@/components/landing/WhyUs";


export const metadata = {
  title: "Facial Surgery Center | Best Oral and Maxillofacial Surgeons",

};

const Page = () => {
  return (
    <div className="min-h-screen">
      <div className="container">
        <Hero
          subcopy="Serving Trumbull Connecticut for over 30 years, The Facial Surgery Center has been putting patients’ needs first, providing superior care in a safe and compassionate environment."
        />
      </div>
      <div >
        <WhyUs />
      </div>
      <div>
        <AreasOfFocus className="pt-16" />
      </div>
      <div className="py-32 bg-bg2 flex flex-col items-center justify-center">
        <HorizontalSlider />
      </div>
      <div className="container pt-16">
        <Location />
      </div>
      <Testimonial />
      <div>
        <CTA />
      </div>
    </div>
  );
};

export default Page;
