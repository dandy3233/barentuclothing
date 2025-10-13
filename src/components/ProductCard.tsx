import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

export const ProductCard = ({ id, name, price, image, category }: ProductCardProps) => {
  return (
    <Link to={`/product/${id}`} className="group block">
      <div className="relative overflow-hidden bg-card mb-4 aspect-[3/4]">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-300" />
      </div>
      <div className="space-y-2">
        <p className="text-xs text-muted-foreground uppercase tracking-wider">{category}</p>
        <h3 className="font-medium text-lg">{name}</h3>
        <p className="text-gold font-medium">ETB {price}</p>
      </div>
    </Link>
  );
};
