// // src/pages/Gallery.tsx

// import { Navbar } from "@/components/Navbar";
// import { Footer } from "@/components/Footer";
// import { GallaryData } from "@/data/GallaryData";

// const Gallery = () => {
//   return (
//     <div className="min-h-screen bg-primary">
//       <Navbar />

//       <main className="pt-32 pb-24">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           {/* Header */}
//           <div className="text-center mb-16 animate-fade-in text-primary-foreground">
//             <h1 className="font-serif text-5xl md:text-6xl font-bold mb-4">
//               Oromo Culture in Motion
//             </h1>
//             <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
//               Every photograph celebrates our heritage. Every design tells an ancient story.
//             </p>
//           </div>

//           {/* Gallery Grid */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {GallaryData.map((image, index) => (
//               <div
//                 key={image.id}
//                 className="group relative overflow-hidden cursor-pointer animate-scale-in"
//                 style={{ 
//                   animationDelay: `${index * 0.1}s`,
//                   height: index % 3 === 0 ? "700px" : "500px",
//                 }}
//               >
//                 <img
//                   src={image.src}
//                   alt={image.title}
//                   className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                   <div className="absolute bottom-0 left-0 right-0 p-8 text-primary-foreground">
//                     <p className="text-xs uppercase tracking-wider text-gold mb-2">
//                       {image.category}
//                     </p>
//                     <h3 className="font-serif text-2xl md:text-3xl font-bold">
//                       {image.title}
//                     </h3>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// };

// export default Gallery;
import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";

interface GalleryItem {
  id: string;
  title: string;
  description?: string;
  image_url: string;
  category?: string;
  display_order?: number;
}

const Gallery = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    const { data, error } = await supabase
      .from("gallery")
      .select("id, title, description, category, display_order, image_url")
      .order("display_order", { ascending: true });

    if (!error && data) setItems(data);
    setLoading(false);
  };

  if (loading) return <div className="min-h-screen bg-primary text-center pt-32">Loading...</div>;

  return (
    <div className="min-h-screen bg-primary">
      <Navbar />
      <main className="pt-32 pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 text-primary-foreground">
            <h1 className="font-serif text-5xl md:text-6xl font-bold mb-4">Oromo Culture in Motion</h1>
            <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
              Every photograph celebrates our heritage. Every design tells an ancient story.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {items.map((item, index) => (
              <div
                key={item.id}
                className="group relative overflow-hidden cursor-pointer"
                style={{ height: index % 3 === 0 ? "700px" : "500px" }}
              >
                <img
                  src={item.image_url}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-primary-foreground">
                    {item.category && <p className="text-xs uppercase tracking-wider text-gold mb-2">{item.category}</p>}
                    <h3 className="font-serif text-2xl md:text-3xl font-bold">{item.title}</h3>
                    {item.description && <p className="mt-2 text-sm">{item.description}</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Gallery;
