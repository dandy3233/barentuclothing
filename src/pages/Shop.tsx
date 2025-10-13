import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import image from "@/assets/image.png";

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const products = [
    {
      id: "1",
      name: "Oromo Heritage Coat",
      price: 320,
      image: image,
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
    {
      id: "4",
      name: "Caffee Ceremonial Jacket",
      price: 450,
      image: product1,
      category: "Outerwear",
    },
    {
      id: "5",
      name: "Hararghe Evening Gown",
      price: 540,
      image: product2,
      category: "Dresses",
    },
    {
      id: "6",
      name: "Gadaa Collection Trousers",
      price: 220,
      image: product3,
      category: "Bottoms",
    },
  ];

  const categories = ["All", "Outerwear", "Dresses", "Bottoms", "Accessories"];

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="pt-32 pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="font-serif text-5xl md:text-6xl font-bold mb-4">
              Shop Collection
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Oromo-inspired designs for the modern wardrobe
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 text-sm font-medium tracking-wide transition-colors ${
                  selectedCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product, index) => (
              <div key={product.id} className="animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <ProductCard {...product} />
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-24">
              <p className="text-muted-foreground text-lg">
                No products found in this category
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Shop;
