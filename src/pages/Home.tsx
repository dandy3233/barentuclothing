// import { Link } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { ProductCard } from "@/components/ProductCard";
// import { Navbar } from "@/components/Navbar";
// import { Footer } from "@/components/Footer";
// import heroImage from "@/assets/hero-image.jpg";
// import product1 from "@/assets/product-1.jpg";
// import product2 from "@/assets/product-2.jpg";
// import designerPortrait from "@/assets/gallary/29.jpg";
// // import designerPortrait from "@/assets/designer-portrait.jpg";
// import gallery1 from "@/assets/gallery-1.jpg";
// import gallery2 from "@/assets/gallery-2.jpg";
// import image from "@/assets/image.png";
// import image54 from "@/assets/gallary/54.jpg";
// import image14 from "@/assets/gallary/14.jpg";
// import image57 from "@/assets/gallary/57.jpg";
// import image45 from "@/assets/gallary/45.jpg";
// import image56 from "@/assets/gallary/56.jpg";

// const Home = () => {
//   const featuredProducts = [
//     {
//       id: "1",
//       name: "Oromo Heritage Coat",
//       price: 3200,
//       image: image54,
//       category: "Outerwear",
//     },
//     {
//       id: "2",
//       name: "Qorichaa Modern Dress",
//       price: 2850,
//       image: image14,
//       category: "Dresses",
//     },
//     {
//       id: "3",
//       name: "Contemporary Diraa Pants",
//       price: 1950,
//       image: image45,
//       category: "Bottoms",
//     },
//   ];

//   const galleryImages = [image54, image];

//   return (
//     <div className="min-h-screen">
//       <Navbar />

//       {/* Hero Section */}
//       <section className="relative h-screen flex items-center justify-center overflow-hidden">
//         <div className="absolute inset-0">
//   <div
//     className="absolute inset-0 bg-cover bg-center blur-sm scale-105"
//     style={{ backgroundImage: `url(${image57})` }}
//   />
//   <div className="absolute inset-0 bg-primary/40 backdrop-blur-sm " />
// </div>


//         <div className="relative z-10 text-center px-4 animate-fade-up">
//           <h1 className="font-serif  text-5xl md:text-7xl lg:text-8xl font-bold text-primary-foreground mb-6">
//             Oromo Heritage Meets Modern Design
//           </h1>
//           <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
//             East African Culture. Contemporary Style.
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <Button asChild size="lg" className="text-base">
//               <Link to="/shop">Shop the Collection</Link>
//             </Button>
//             <Button asChild size="lg" variant="outline" className="text-base bg-primary-foreground/10 backdrop-blur-sm border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/20">
//               <Link to="/gallery">Explore the Gallery</Link>
//             </Button>
//           </div>
//         </div>
//       </section>

//       {/* Featured Collection */}
//       <section className="py-24 bg-background">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16 animate-fade-in">
//             <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">
//               Featured Collection
//             </h2>
//             <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
//               Where Oromo traditions inspire contemporary fashion
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
//             {featuredProducts.map((product) => (
//               <div key={product.id} className="animate-scale-in">
//                 <ProductCard {...product} />
//               </div>
//             ))}
//           </div>

//           <div className="text-center">
//             <Button asChild size="lg" variant="outline">
//               <Link to="/shop">View All Products</Link>
//             </Button>
//           </div>
//         </div>
//       </section>

//       {/* About Snippet */}
//       <section className="py-24 bg-secondary">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
//             <div className="animate-fade-in">
//               <img
//                 src={designerPortrait}
//                 alt="Designer portrait"
//                 className="w-full h-[600px] object-cover"
//               />
//             </div>
//             <div className="space-y-6 animate-fade-up">
//               <h2 className="font-serif text-4xl md:text-5xl font-bold">
//                 Rooted in Oromo Heritage
//               </h2>
//               <p className="text-muted-foreground text-lg leading-relaxed">
//                 BARENTU CLOTHING is inspired by the rich traditions of the Oromo people of East Africa. 
//                 We honor centuries of craftsmanship, vibrant patterns, and cultural wisdom while reimagining 
//                 them for the modern world. Each garment tells a story of heritage meeting innovation.
//               </p>
//               <p className="text-muted-foreground text-lg leading-relaxed">
//                 From the flowing lines of traditional Oromo dress to contemporary silhouettes, we celebrate 
//                 our roots while embracing the future. Our designs speak to those who value authenticity, 
//                 sustainability, and cultural pride.
//               </p>
//               <Button asChild size="lg">
//                 <Link to="/about">Discover the Story</Link>
//               </Button>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Gallery Teaser */}
//       <section className="py-24 bg-background">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16 animate-fade-in">
//             <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">
//               The Art of Fashion
//             </h2>
//             <p className="text-muted-foreground text-lg">
//               Every photo tells a story
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
//             {galleryImages.map((image, index) => (
//               <div
//                 key={index}
//                 className="relative overflow-hidden h-[600px] group animate-scale-in"
//               >
//                 <img
//                   src={image}
//                   alt={`Gallery image ${index + 1}`}
//                   className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
//                 />
//                 <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors duration-300" />
//               </div>
//             ))}
//           </div>

//           <div className="text-center">
//             <Button asChild size="lg" variant="outline">
//               <Link to="/gallery">View Full Gallery</Link>
//             </Button>
//           </div>
//         </div>
//       </section>

//       {/* Newsletter */}
//      <section className="py-24 bg-primary text-primary-foreground">
//   <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
//     <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">
//       Join the Barentu Community
//     </h2>
//     <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
//       Connect with a community celebrating Oromo culture through modern fashion
//     </p>

//     <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
//       <input
//         type="email"
//         placeholder="Enter your email"
//         className="flex-1 px-6 py-3 bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:border-primary-foreground/40"
//       />
//       <Button
//         variant="secondary"
//         size="lg"
//         className="w-full sm:w-auto" 
//       >
//         Subscribe
//       </Button>
//     </div>
//   </div>
// </section>


//       <Footer />
//     </div>
//   );
// };

// export default Home;


'use client';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import designerPortrait from "@/assets/gallary/29.jpg";
import image from "@/assets/image.png";
import image57 from "@/assets/gallary/57.jpg";

interface Product {
  id: string;
  name: string;
  price: number;
  discount_price?: number;
  category: string;
  images: string[];
  featured: boolean;
}

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch featured products from Supabase
  const fetchFeaturedProducts = async () => {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("featured", true)
        .eq("status", "active")
        .order("created_at", { ascending: false })
        .limit(3); // Get only 3 featured products for the homepage

      if (error) {
        console.error("Error fetching featured products:", error);
        return;
      }

      if (data) {
        setFeaturedProducts(data);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const galleryImages = [image57, image];

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center blur-sm scale-105"
            style={{ backgroundImage: `url(${image57})` }}
          />
          <div className="absolute inset-0 bg-primary/40 backdrop-blur-sm" />
        </div>

        <div className="relative z-10 text-center px-4 animate-fade-up">
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-primary-foreground mb-6">
            Oromo Heritage Meets Modern Design
          </h1>
          <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            East African Culture. Contemporary Style.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-base">
              <Link to="/shop">Shop the Collection</Link>
            </Button>
            <Button 
              asChild 
              size="lg" 
              variant="outline" 
              className="text-base bg-primary-foreground/10 backdrop-blur-sm border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/20"
            >
              <Link to="/gallery">Explore the Gallery</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Collection */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">
              Featured Collection
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Where Oromo traditions inspire contemporary fashion
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading featured products...</p>
            </div>
          ) : featuredProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                {featuredProducts.map((product) => (
                  <div key={product.id} className="animate-scale-in">
                    <ProductCard
                      id={product.id}
                      name={product.name}
                      price={product.price}
                      discountPrice={product.discount_price}
                      image={product.images?.[0] || ""}
                      category={product.category}
                    />
                  </div>
                ))}
              </div>
              <div className="text-center">
                <Button asChild size="lg" variant="outline">
                  <Link to="/shop">View All Products</Link>
                </Button>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-6">No featured products available at the moment.</p>
              <Button asChild size="lg">
                <Link to="/shop">Explore All Products</Link>
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* About Snippet */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <img
                src={designerPortrait}
                alt="Designer portrait"
                className="w-full h-[600px] object-cover"
              />
            </div>
            <div className="space-y-6 animate-fade-up">
              <h2 className="font-serif text-4xl md:text-5xl font-bold">
                Rooted in Oromo Heritage
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                BARENTU CLOTHING is inspired by the rich traditions of the Oromo people of East Africa. 
                We honor centuries of craftsmanship, vibrant patterns, and cultural wisdom while reimagining 
                them for the modern world. Each garment tells a story of heritage meeting innovation.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                From the flowing lines of traditional Oromo dress to contemporary silhouettes, we celebrate 
                our roots while embracing the future. Our designs speak to those who value authenticity, 
                sustainability, and cultural pride.
              </p>
              <Button asChild size="lg">
                <Link to="/about">Discover the Story</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Teaser */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">
              The Art of Fashion
            </h2>
            <p className="text-muted-foreground text-lg">
              Every photo tells a story
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className="relative overflow-hidden h-[600px] group animate-scale-in"
              >
                <img
                  src={image}
                  alt={`Gallery image ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors duration-300" />
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button asChild size="lg" variant="outline">
              <Link to="/gallery">View Full Gallery</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">
            Join the Barentu Community
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
            Connect with a community celebrating Oromo culture through modern fashion
          </p>

          <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-3 bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:border-primary-foreground/40"
            />
            <Button
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto" 
            >
              Subscribe
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;