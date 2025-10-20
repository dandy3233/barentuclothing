// import { useParams, Link } from "react-router-dom";
// import { Navbar } from "@/components/Navbar";
// import { Footer } from "@/components/Footer";
// import { Button } from "@/components/ui/button";
// import { ProductCard } from "@/components/ProductCard";
// import { useCart } from "@/context/CartContext";
// import { ArrowLeft } from "lucide-react";

// // === Import All Images ===
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

// const ProductDetail = () => {
//   const { id } = useParams();
//   const { addToCart } = useCart();

//   const categories = ["Outerwear", "Dresses", "Bottoms", "Accessories"];

//   // === Build All Products ===
//   const products = imageArray.map((img, i) => ({
//     id: (i + 1).toString(),
//     name: `Oromo Inspired Design ${i + 14}`,
//     price: 1500 + i * 100,
//     image: img,
//     category: categories[i % categories.length],
//     description:
//       "This piece celebrates Oromo cultural artistry blended with modern craftsmanship, merging heritage and innovation.",
//     details: [
//       "High-quality fabric sourced responsibly",
//       "Elegant Oromo-inspired detailing",
//       "Designed for comfort and heritage expression",
//     ],
//     care: [
//       "Hand wash or gentle machine wash",
//       "Do not bleach",
//       "Cool iron if necessary",
//     ],
//   }));

//   const product = products.find((p) => p.id === id);

//   if (!product) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-center">
//         <div>
//           <h1 className="text-2xl font-bold mb-4">Product not found</h1>
//           <Button asChild>
//             <Link to="/shop">Return to Shop</Link>
//           </Button>
//         </div>
//       </div>
//     );
//   }

//   // === Random Recommended Products (No Duplicates) ===
//   const shuffled = [...products].filter((p) => p.id !== id).sort(() => 0.5 - Math.random());
//   const recommendedProducts = shuffled.slice(0, 3);

//   return (
//     <div className="min-h-screen">
//       <Navbar />

//       <main className="pt-32 pb-24">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           {/* Back Button */}
//           <Button variant="ghost" asChild className="mb-8">
//             <Link to="/shop" className="flex items-center gap-2">
//               <ArrowLeft size={20} />
//               Back to Shop
//             </Link>
//           </Button>

//           {/* === Product Detail Section === */}
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
//             {/* Product Image */}
//             <div className="aspect-[3/4] bg-secondary overflow-hidden rounded-2xl shadow-md">
//               <img
//                 src={product.image}
//                 alt={product.name}
//                 className="w-full h-full object-cover"
//               />
//             </div>

//             {/* Product Info */}
//             <div className="space-y-8">
//               <div>
//                 <p className="text-sm text-muted-foreground uppercase mb-2">
//                   {product.category}
//                 </p>
//                 <h1 className="font-serif text-4xl font-bold mb-4">
//                   {product.name}
//                 </h1>
//                 <p className="text-3xl font-medium text-gold">
//                   {product.price} ETB
//                 </p>
//               </div>

//               <p className="text-muted-foreground text-lg leading-relaxed">
//                 {product.description}
//               </p>

//               {/* Product Details */}
//               <div>
//                 <h3 className="font-medium text-lg mb-2">Product Details</h3>
//                 <ul className="space-y-2">
//                   {product.details.map((d, i) => (
//                     <li key={i}>• {d}</li>
//                   ))}
//                 </ul>
//               </div>

//               {/* Care Instructions */}
//               <div>
//                 <h3 className="font-medium text-lg mb-2">Care Instructions</h3>
//                 <ul className="space-y-2">
//                   {product.care.map((c, i) => (
//                     <li key={i}>• {c}</li>
//                   ))}
//                 </ul>
//               </div>

//               {/* Add to Cart */}
//               <Button
//                 size="lg"
//                 onClick={() =>
//                   addToCart({
//                     id: product.id,
//                     name: product.name,
//                     price: product.price,
//                     image: product.image,
//                     category: product.category,
//                   })
//                 }
//               >
//                 Add to Cart
//               </Button>
//             </div>
//           </div>

//           {/* === Recommended Section === */}
//           <h2 className="font-serif text-3xl font-bold mb-8 text-center">
//             You May Also Like
//           </h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//             {recommendedProducts.map((p) => (
//               <ProductCard key={p.id} {...p} />
//             ))}
//           </div>
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// };

// export default ProductDetail;
'use client';
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { ArrowLeft } from "lucide-react";
import { useCart } from "@/context/CartContext";

interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  discount_price?: number;
  sku?: string;
  stock_quantity?: number;
  category?: string;
  tags?: string[];
  fabric_type?: string;
  sizes?: string[];
  colors?: string[];
  images?: string[];
  status?: string;
  featured?: boolean;
  created_at?: string;
  updated_at?: string;
}

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    const { data, error } = await supabase.from<Product>("products").select("*");
    if (!error && data) {
      setAllProducts(data);
      const p = data.find((prod) => prod.id === id);
      setProduct(p || null);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, [id]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center">
        <div>
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <Button asChild>
            <Link to="/shop">Return to Shop</Link>
          </Button>
        </div>
      </div>
    );
  }

  // Recommended products (exclude current)
  const recommendedProducts = allProducts
    .filter((p) => p.id !== product.id)
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);

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

          {/* Product Detail */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
            {/* Images */}
            <div className="aspect-[3/4] bg-secondary overflow-hidden rounded-2xl shadow-md">
              <img
                src={product.images?.[0] || ""}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Product Info */}
            <div className="space-y-8">
              <div>
                <p className="text-sm text-muted-foreground uppercase mb-2">
                  {product.category}
                </p>
                <h1 className="font-serif text-4xl font-bold mb-4">{product.name}</h1>
                <p className="text-3xl font-medium text-gold">
                  {product.discount_price ? (
                    <>
                      <span className="line-through mr-2">{product.price} ETB</span>
                      <span>{product.discount_price} ETB</span>
                    </>
                  ) : (
                    <>{product.price} ETB</>
                  )}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  SKU: {product.sku} | Stock: {product.stock_quantity || 0}
                </p>
              </div>

              <p className="text-muted-foreground text-lg leading-relaxed">
                {product.description}
              </p>

              {product.sizes && product.sizes.length > 0 && (
                <p className="text-muted-foreground">
                  Sizes: {product.sizes.join(", ")}
                </p>
              )}

              {product.colors && product.colors.length > 0 && (
                <p className="text-muted-foreground">
                  Colors: {product.colors.join(", ")}
                </p>
              )}

              <Button
                size="lg"
                onClick={() =>
                  addToCart({
                    id: product.id,
                    name: product.name,
                    price: product.discount_price || product.price,
                    image: product.images?.[0] || "",
                    category: product.category || "",
                  })
                }
              >
                Add to Cart
              </Button>
            </div>
          </div>

          {/* Recommended */}
          {recommendedProducts.length > 0 && (
            <>
              <h2 className="font-serif text-3xl font-bold mb-8 text-center">
                You May Also Like
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {recommendedProducts.map((p) => (
                  <ProductCard
                    key={p.id}
                    id={p.id}
                    name={p.name}
                    price={p.discount_price || p.price}
                    image={p.images?.[0] || ""}
                    category={p.category || ""}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;






