import { Link } from "react-router-dom";
import { Minus, Plus, X, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart();

  if (cart.length === 0) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen pt-32 pb-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <ShoppingBag className="w-16 h-16 mx-auto mb-6 text-muted-foreground" />
            <h1 className="font-serif text-4xl mb-4">Your Cart is Empty</h1>
            <p className="text-muted-foreground mb-8">
              Discover our collection of Oromo-inspired designs
            </p>
            <Button asChild size="lg">
              <Link to="/shop">Continue Shopping</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <h1 className="font-serif text-4xl md:text-5xl">Shopping Cart</h1>
            <Button variant="outline" onClick={clearCart}>
              Clear Cart
            </Button>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-6 p-6 bg-card border border-border rounded-lg"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-32 object-cover rounded"
                  />
                  
                  <div className="flex-1">
                    <div className="flex justify-between mb-2">
                      <div>
                        <Link to={`/product/${item.id}`}>
                          <h3 className="font-medium text-lg hover:text-primary transition-colors">
                            {item.name}
                          </h3>
                        </Link>
                        <p className="text-sm text-muted-foreground uppercase">
                          {item.category}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-3">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <span className="w-12 text-center font-medium">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>

                      <p className="text-lg font-medium text-gold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-card border border-border rounded-lg p-6 sticky top-24">
                <h2 className="font-serif text-2xl mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">${getCartTotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-medium">Free</span>
                  </div>
                  <div className="border-t border-border pt-4">
                    <div className="flex justify-between text-lg">
                      <span className="font-medium">Total</span>
                      <span className="font-serif text-gold text-2xl">
                        ${getCartTotal().toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <Button size="lg" className="w-full mb-4">
                  Proceed to Checkout
                </Button>
                
                <Button variant="outline" size="lg" className="w-full" asChild>
                  <Link to="/shop">Continue Shopping</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Cart;
