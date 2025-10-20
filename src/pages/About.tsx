import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import designerPortrait from "@/assets/designer-portrait.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import image29 from "@/assets/gallary/29.jpg";
import image39 from "@/assets/gallary/39.jpg";
import image57 from "@/assets/gallary/57.jpg";
import image45 from "@/assets/gallary/45.jpg";

const About = () => {
  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="pt-32 pb-24">
        {/* Hero */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-24">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6">
              Rooted in Oromo Heritage
            </h1>
            <p className="text-muted-foreground text-xl max-w-3xl mx-auto leading-relaxed">
              Where East African traditions meet contemporary fashion—honoring the Oromo legacy
            </p>
          </div>
        </div>

        {/* Designer Story */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <img
                src={image29}
                alt="Designer portrait"
                className="w-full h-[700px] object-cover"
              />
            </div>
            <div className="space-y-6 animate-fade-up">
              <h2 className="font-serif text-4xl font-bold">
                The Oromo Legacy
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                BARENTU CLOTHING is deeply rooted in the traditions of the Oromo people, one of 
                East Africa's largest and most vibrant communities. Our name, "Barentu," represents 
                one of the two major branches of the Oromo clan system—symbolizing unity, strength, 
                and cultural continuity across generations.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                For centuries, Oromo culture has celebrated beauty through intricate textiles, 
                meaningful patterns, and ceremonial dress. We honor this legacy by reimagining 
                traditional elements—the flowing diraa, vibrant qorichaa colors, and symbolic 
                embroidery—into contemporary pieces that resonate with today's world.
              </p>
            </div>
          </div>
        </div>

        {/* Philosophy */}
        <div className="bg-secondary py-24 mb-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="font-serif text-4xl md:text-5xl font-bold mb-8">
                Our Philosophy
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-16">
                <div className="space-y-4">
                  <h3 className="font-serif text-2xl font-bold">Cultural Pride</h3>
                  <p className="text-muted-foreground">
                    Authentic representation of Oromo heritage in every stitch and pattern
                  </p>
                </div>
                <div className="space-y-4">
                  <h3 className="font-serif text-2xl font-bold">Artisan Partnership</h3>
                  <p className="text-muted-foreground">
                    Working with Oromo craftspeople to preserve traditional techniques
                  </p>
                </div>
                <div className="space-y-4">
                  <h3 className="font-serif text-2xl font-bold">Sustainable Craft</h3>
                  <p className="text-muted-foreground">
                    Honoring our land through ethical materials and mindful production
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Studio */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 order-2 lg:order-1 animate-fade-up">
              <h2 className="font-serif text-4xl font-bold">
                Where Tradition Meets Innovation
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Our atelier bridges two worlds. Here, master Oromo weavers work alongside modern 
                designers, sharing knowledge passed down through generations. Traditional hand-weaving 
                techniques meet contemporary tailoring, creating garments that honor the past while 
                embracing the future.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Each BARENTU piece begins with consultation with Oromo elders and cultural historians 
                to ensure authenticity. We then translate these timeless elements into designs that 
                resonate with modern life—preserving our heritage while making it accessible to all.
              </p>
              <Button asChild size="lg">
                <Link to="/contact">Get in Touch</Link>
              </Button>
            </div>
            <div className="order-1 lg:order-2 animate-fade-in">
              <img
                src={image39}
                alt="Studio workspace"
                className="w-full h-[600px] object-cover"
              />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
