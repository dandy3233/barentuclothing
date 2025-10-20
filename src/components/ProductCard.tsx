import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  discountPrice?: number;
  image: string;
  category: string;
}

export const ProductCard = ({ 
  id, 
  name, 
  price, 
  discountPrice, 
  image, 
  category 
}: ProductCardProps) => {
  const hasDiscount = discountPrice && discountPrice < price;
  const discountPercentage = hasDiscount 
    ? Math.round(((price - discountPrice) / price) * 100)
    : 0;

  return (
    <Link to={`/product/${id}`} className="group block">
      <div className="relative overflow-hidden bg-card mb-4 aspect-[3/4]">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Discount Badge */}
        {hasDiscount && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-bold">
            -{discountPercentage}%
          </div>
        )}
        
        <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-300" />
      </div>
      
      <div className="space-y-2">
        <p className="text-xs text-muted-foreground uppercase tracking-wider">{category}</p>
        <h3 className="font-medium text-lg group-hover:text-primary transition-colors">{name}</h3>
        
        {/* Price Display */}
        <div className="flex items-center gap-2">
          {hasDiscount ? (
            <>
              <p className="text-gold font-medium">ETB {discountPrice.toFixed(2)}</p>
              <p className="text-muted-foreground line-through text-sm">ETB {price.toFixed(2)}</p>
            </>
          ) : (
            <p className="text-gold font-medium">ETB {price.toFixed(2)}</p>
          )}
        </div>
        
        {/* Savings Info */}
        {hasDiscount && (
          <p className="text-green-600 text-sm font-medium">
            You save ETB {(price - discountPrice).toFixed(2)}
          </p>
        )}
      </div>
    </Link>
  );
};