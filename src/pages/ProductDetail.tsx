import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { useCart } from "@/context/CartContext";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import { ArrowLeft } from "lucide-react";
import image54 from "@/assets/gallary/54.jpg";
import image14 from "@/assets/gallary/14.jpg";
import image38 from "@/assets/gallary/38.jpg";
import image45 from "@/assets/gallary/45.jpg";

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();

  // Mock product data
  const products = {
    "1": {
      name: "Oromo Heritage Coat",
      price: 320,
      image: image54,
      category: "Outerwear",
      description:
        "Inspired by traditional Oromo ceremonial garments, this contemporary coat features subtle cultural motifs and modern tailoring. The design honors the flowing elegance of Oromo leadership attire while offering contemporary sophistication.",
      details: [
        "Premium wool blend with traditional weaving patterns",
        "Hand-stitched Oromo-inspired embroidery",
        "Ethically sourced from East African suppliers",
        "Oversized contemporary fit",
        "Cultural motifs at collar and cuffs",
      ],
      care: ["Dry clean only", "Do not bleach", "Cool iron if needed", "Store with care"],
    },
    "2": {
      name: "Qorichaa Modern Dress",
      price: 285,
      image: image14,
      category: "Dresses",
      description:
        "Named after the vibrant colors of traditional Oromo dress, this flowing piece reimagines cultural heritage with contemporary grace. Hand-dyed using traditional Oromo color techniques passed down through generations.",
      details: [
        "Organic cotton with natural dyes",
        "Hand-dyed using traditional Oromo methods",
        "Flowing silhouette inspired by diraa",
        "Adjustable waist with woven belt detail",
        "Midi length with cultural pattern trim",
      ],
      care: ["Hand wash cold separately", "Hang to dry", "Iron on low heat", "Colors may deepen with age"],
    },
    "3": {
      name: "Contemporary Diraa Pants",
      price: 195,
      image: image45,
      category: "Bottoms",
      description:
        "Drawing from the flowing lines of the traditional Oromo diraa, these modern trousers offer comfort and cultural pride in every step. The high waist features handwoven details from Oromo artisans.",
      details: [
        "Linen blend for breathability",
        "Handwoven waistband by Oromo craftspeople",
        "High-waisted traditional fit",
        "Wide leg inspired by diraa flow",
        "Hidden cultural symbols in seam work",
      ],
      care: ["Machine wash cold", "Tumble dry low", "Iron as needed", "Cultural details require gentle handling"],
    },
  };

  const product = products[id as keyof typeof products];

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <Button asChild>
            <Link to="/shop">Return to Shop</Link>
          </Button>
        </div>
      </div>
    );
  }

  const recommendedProducts = [
    {
      id: "1",
      name: "Oromo Heritage Coat",
      price: 320,
      image: product1,
      category: "Outerwear",
    },
    {
      id: "2",
      name: "Qorichaa Modern Dress",
      price: 285,
      image: product2,
      category: "Dresses",
    },
    {
      id: "3",
      name: "Contemporary Diraa Pants",
      price: 195,
      image: product3,
      category: "Bottoms",
    },
  ].filter((p) => p.id !== id);

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="pt-32 pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <Button variant="ghost" asChild className="mb-8">
            <Link to="/shop" className="flex items-center gap-2">
              <ArrowLeft size={20} />
              Back to Shop
            </Link>
          </Button>

          {/* Product Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
            {/* Product Image */}
            <div className="animate-fade-in">
              <div className="aspect-[3/4] bg-secondary overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-8 animate-fade-up">
              <div>
                <p className="text-sm text-muted-foreground uppercase tracking-wider mb-2">
                  {product.category}
                </p>
                <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">
                  {product.name}
                </h1>
                <p className="text-3xl font-medium text-gold">${product.price}</p>
              </div>

              <p className="text-muted-foreground text-lg leading-relaxed">
                {product.description}
              </p>

              <div className="space-y-4">
                <h3 className="font-medium text-lg">Product Details</h3>
                <ul className="space-y-2">
                  {product.details.map((detail, index) => (
                    <li key={index} className="text-muted-foreground flex items-start">
                      <span className="mr-2">•</span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium text-lg">Care Instructions</h3>
                <ul className="space-y-2">
                  {product.care.map((instruction, index) => (
                    <li key={index} className="text-muted-foreground flex items-start">
                      <span className="mr-2">•</span>
                      {instruction}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6">
                <p className="text-sm text-gold mb-4 font-medium">
                  Crafted with Oromo Artisan Techniques • Sustainable Materials
                </p>
                <Button 
                  size="lg" 
                  className="w-full sm:w-auto"
                  onClick={() => addToCart({
                    id: id || "1",
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    category: product.category
                  })}
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>

          {/* Recommended Products */}
          <div>
            <h2 className="font-serif text-3xl font-bold mb-8 text-center">
              You May Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {recommendedProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
