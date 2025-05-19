import HeroSection from '../sections/HeroSection';
import FeaturedProducts from '../sections/FeaturedProducts';
import CategoriesSection from '../sections/CategoriesSection';
import DealsSection from '../sections/DealsSection';
import NewArrivalsSection from '../sections/NewArrivalsSection';
import WhyChooseUsSection from '../sections/WhyChooseUsSection';
import PopularBrandsSection from '../sections/PopularBrandsSection';
import TestimonialsSection from '../sections/TestimonialsSection';
import NewsletterSection from '../sections/NewsletterSection';

const Home = () => {
  return (
    <div>
      <HeroSection />
      <NewArrivalsSection />
      <FeaturedProducts />
      <DealsSection />
      <WhyChooseUsSection />
      <PopularBrandsSection />
      <CategoriesSection />
      <TestimonialsSection />
      <NewsletterSection />
    </div>
  );
};

export default Home;
