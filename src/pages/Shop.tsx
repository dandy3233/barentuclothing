// import { useState } from "react";
// import { Navbar } from "@/components/Navbar";
// import { Footer } from "@/components/Footer";
// import { ProductCard } from "@/components/ProductCard";

// import image14 from "@/assets/gallary/14.jpg";
// import image15 from "@/assets/gallary/15.jpg";
// import image16 from "@/assets/gallary/16.jpg";
// import image17 from "@/assets/gallary/17.jpg";
// import image18 from "@/assets/gallary/18.jpg";
// import image19 from "@/assets/gallary/19.jpg";
// import image20 from "@/assets/gallary/20.jpg";
// import image21 from "@/assets/gallary/21.jpg";
// import image22 from "@/assets/gallary/22.jpg";
// import image23 from "@/assets/gallary/23.jpg";
// import image24 from "@/assets/gallary/24.jpg";
// import image25 from "@/assets/gallary/25.jpg";
// import image26 from "@/assets/gallary/26.jpg";
// import image27 from "@/assets/gallary/27.jpg";
// import image28 from "@/assets/gallary/28.jpg";
// import image29 from "@/assets/gallary/29.jpg";
// import image30 from "@/assets/gallary/30.jpg";
// import image31 from "@/assets/gallary/31.jpg";
// import image32 from "@/assets/gallary/32.jpg";
// import image33 from "@/assets/gallary/33.jpg";
// import image34 from "@/assets/gallary/34.jpg";
// import image35 from "@/assets/gallary/35.jpg";
// import image36 from "@/assets/gallary/36.jpg";
// import image37 from "@/assets/gallary/37.jpg";
// import image38 from "@/assets/gallary/38.jpg";
// import image39 from "@/assets/gallary/39.jpg";
// import image40 from "@/assets/gallary/40.jpg";
// import image41 from "@/assets/gallary/41.jpg";
// import image42 from "@/assets/gallary/42.jpg";
// import image43 from "@/assets/gallary/43.jpg";
// import image44 from "@/assets/gallary/44.jpg";
// import image45 from "@/assets/gallary/45.jpg";
// import image46 from "@/assets/gallary/46.jpg";
// import image47 from "@/assets/gallary/47.jpg";
// import image48 from "@/assets/gallary/48.jpg";
// import image49 from "@/assets/gallary/49.jpg";
// import image50 from "@/assets/gallary/50.jpg";
// import image51 from "@/assets/gallary/51.jpg";
// import image52 from "@/assets/gallary/52.jpg";
// import image53 from "@/assets/gallary/53.jpg";
// import image54 from "@/assets/gallary/54.jpg";
// import image55 from "@/assets/gallary/55.jpg";
// import image56 from "@/assets/gallary/56.jpg";
// import image57 from "@/assets/gallary/57.jpg";

// const imageArray = [
//   image14, image15, image16, image17, image18, image19, image20, image21,
//   image22, image23, image24, image25, image26, image27, image28, image29,
//   image30, image31, image32, image33, image34, image35, image36, image37,
//   image38, image39, image40, image41, image42, image43, image44, image45,
//   image46, image47, image48, image49, image50, image51, image52, image53,
//   image54, image55, image56, image57,
// ];

// const Shop = () => {
//   const [selectedCategory, setSelectedCategory] = useState("All");

//   const categories = ["All", "Outerwear", "Dresses", "Bottoms", "Accessories"];

//   // Generate product list dynamically
//   const products = imageArray.map((img, i) => ({
//     id: (i + 1).toString(),
//     name: `Oromo Inspired Design ${i + 14}`,
//     price: 1500 + i * 100,
//     image: img,
//     category: categories[(i % (categories.length - 1)) + 1],
//   }));

//   const filteredProducts =
//     selectedCategory === "All"
//       ? products
//       : products.filter((p) => p.category === selectedCategory);

//   return (
//     <div className="min-h-screen">
//       <Navbar />

//       <main className="pt-32 pb-24">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           {/* Header */}
//           <div className="text-center mb-16 animate-fade-in">
//             <h1 className="font-serif text-5xl md:text-6xl font-bold mb-4">
//               Shop Collection
//             </h1>
//             <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
//               Oromo-inspired designs for the modern wardrobe
//             </p>
//           </div>

//           {/* Category Filter */}
//           <div className="flex flex-wrap justify-center gap-4 mb-16">
//             {categories.map((category) => (
//               <button
//                 key={category}
//                 onClick={() => setSelectedCategory(category)}
//                 className={`px-6 py-2 text-sm font-medium tracking-wide transition-colors ${
//                   selectedCategory === category
//                     ? "bg-primary text-primary-foreground"
//                     : "bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground"
//                 }`}
//               >
//                 {category}
//               </button>
//             ))}
//           </div>

//           {/* Product Grid */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//             {filteredProducts.map((product, index) => (
//               <div
//                 key={product.id}
//                 className="animate-scale-in"
//                 style={{ animationDelay: `${index * 0.1}s` }}
//               >
//                 <ProductCard {...product} />
//               </div>
//             ))}
//           </div>

//           {filteredProducts.length === 0 && (
//             <div className="text-center py-24">
//               <p className="text-muted-foreground text-lg">
//                 No products found in this category.
//               </p>
//             </div>
//           )}
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// };

// export default Shop;

'use client';
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";

interface Product {
  id: string;
  name: string;
  price: number;
  discount_price?: number;
  category: string;
  images: string[];
}

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const categories = ["All", "Outerwear", "Dresses", "Bottoms", "Accessories"];

  // Fetch products from Supabase
  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setProducts(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

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

          {/* Product Grid */}
          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading products...</p>
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  discountPrice={product.discount_price}
                  image={product.images?.[0] || ""}
                  category={product.category}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-24">
              <p className="text-muted-foreground text-lg">
                No products found in this category.
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