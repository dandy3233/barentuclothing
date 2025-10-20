'use client';

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Minus, Plus, X, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/context/CartContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

// Generate unique order number with timestamp + random suffix
const generateOrderNumber = () => `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart();
  const { toast } = useToast();

  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [orderNumber, setOrderNumber] = useState<string>("");

  // Generate or retrieve order number on mount
  useEffect(() => {
    let savedNumber = localStorage.getItem("orderNumber");
    if (!savedNumber) {
      savedNumber = generateOrderNumber();
      localStorage.setItem("orderNumber", savedNumber);
    }
    setOrderNumber(savedNumber);
  }, []);

  const handleOrder = async () => {
    if (cart.length === 0) {
      toast({ title: "Cart is empty", variant: "destructive" });
      return;
    }

    if (!customerName || !customerEmail || !customerPhone) {
      toast({ title: "Please fill in all customer details", variant: "destructive" });
      return;
    }

    setLoading(true);
    const total_amount = getCartTotal();

    const { data, error } = await supabase.from("orders").insert([
      {
        order_number: orderNumber,
        customer_name: customerName,
        customer_email: customerEmail,
        customer_phone: customerPhone,
        total_amount,
      },
    ]);

    setLoading(false);

    if (error) {
      toast({ title: "Error creating order", description: error.message, variant: "destructive" });
    } else {
      toast({ title: `Order ${orderNumber} created successfully` });
      clearCart();
      setCustomerName("");
      setCustomerEmail("");
      setCustomerPhone("");

      // Clear the old order number and generate a new one for next order
      localStorage.removeItem("orderNumber");
      const newNumber = generateOrderNumber();
      localStorage.setItem("orderNumber", newNumber);
      setOrderNumber(newNumber);
    }
  };

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
                <div key={item.id} className="flex gap-6 p-6 bg-card border border-border rounded-lg">
                  <img src={item.image} alt={item.name} className="w-24 h-32 object-cover rounded" />
                  <div className="flex-1">
                    <div className="flex justify-between mb-2">
                      <div>
                        <Link to={`/product/${item.id}`}>
                          <h3 className="font-medium text-lg hover:text-primary transition-colors">
                            {item.name}
                          </h3>
                        </Link>
                        <p className="text-sm text-muted-foreground uppercase">{item.category}</p>
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.id)}>
                        <X className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-3">
                        <Button variant="outline" size="icon" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                          <Minus className="w-4 h-4" />
                        </Button>
                        <span className="w-12 text-center font-medium">{item.quantity}</span>
                        <Button variant="outline" size="icon" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                      <p className="text-lg font-medium text-gold">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary / Form */}
            <div className="lg:col-span-1">
              <div className="bg-card border border-border rounded-lg p-6 sticky top-24 space-y-4">
                <h2 className="font-serif text-2xl mb-4">Order Summary</h2>

                <div className="space-y-2">
                  <label className="block font-medium">Order Number (readonly)</label>
                  <Input value={orderNumber} readOnly className="bg-gray-100 cursor-not-allowed" />
                </div>

                <div className="space-y-2">
                  <label className="block font-medium">Name</label>
                  <Input value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <label className="block font-medium">Email</label>
                  <Input value={customerEmail} onChange={(e) => setCustomerEmail(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <label className="block font-medium">Phone</label>
                  <Input value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} />
                </div>

                <div className="border-t border-border pt-4">
                  <div className="flex justify-between text-lg mb-4">
                    <span className="font-medium">Subtotal</span>
                    <span className="font-medium">${getCartTotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between mb-4">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-medium">Free</span>
                  </div>
                  <div className="flex justify-between font-serif text-gold text-2xl">
                    <span>Total</span>
                    <span>${getCartTotal().toFixed(2)}</span>
                  </div>
                </div>

                <Button size="lg" className="w-full mb-4" onClick={handleOrder} disabled={loading}>
                  {loading ? "Processing..." : "Place Order"}
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
