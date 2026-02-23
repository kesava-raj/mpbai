import { Hero } from "@/components/home/Hero";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { ServicesPreview } from "@/components/home/ServicesPreviewNew";
import { Testimonials } from "@/components/home/TestimonialsNew";

export default function Home() {
  return (
    <>
      <Hero />
      <WhyChooseUs />
      <ServicesPreview />
      <Testimonials />
    </>
  );
}
