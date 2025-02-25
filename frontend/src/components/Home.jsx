import PlatformFeaturesSection from "./BenefitSection";
import BenefitsSection from "./BenefitSection";
import FeaturedArticles from "./FeturedAtricles";

import HeroSection from "./HeroSection";
import NewsletterSignup from "./NewsletterSignup";
import UploadArticleSection from "./UploadArticleSection";

const HomePage = () => {
    return (
      <div >
        <HeroSection />
  
        <FeaturedArticles />
  
        <PlatformFeaturesSection />

        <UploadArticleSection/>
  
        <NewsletterSignup />
  
        
      </div>
    );
  };
  
  export default HomePage;
  