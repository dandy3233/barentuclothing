'use client'

import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableBody,
  TableCell
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, Upload, Image as ImageIcon, Package } from "lucide-react";

// ========================
// Product Interface
// ========================
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discount_price?: number;
  stock_quantity: number;
  category: string;
  status: string;
  sku: string;
  featured: boolean;
  images: string[];
}

// ========================
// Main Component
// ========================
export default function ProductManagement() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const { toast } = useToast();

  // Fetch products
  const fetchProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({ variant: "destructive", title: "Error fetching products", description: error.message });
    } else {
      setProducts(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Delete product
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) {
      toast({ variant: "destructive", title: "Error deleting product", description: error.message });
    } else {
      toast({ title: "Product deleted successfully" });
      fetchProducts();
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setEditOpen(true);
  };

  // Mobile-friendly product card
  const ProductCard = ({ product }: { product: Product }) => (
  <Card className="p-4 mb-4">
    <div className="flex items-start gap-3">
      <div className="flex-shrink-0">
        {product.images?.length > 0 ? (
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-16 h-16 object-cover rounded-lg"
          />
        ) : (
          <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
            <ImageIcon className="h-6 w-6 text-muted-foreground" />
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-sm truncate">{product.name}</h3>
        <p className="text-xs text-muted-foreground mt-1">{product.category}</p>
        
        {/* CORRECTED PRICE DISPLAY */}
        <div className="flex items-center gap-2 mt-2">
          {product.discount_price ? (
            <>
              <span className="font-bold text-sm text-green-600">{product.discount_price.toFixed(2)} ETB</span>
              <span className="text-xs text-muted-foreground line-through">{product.price.toFixed(2)} ETB</span>
            </>
          ) : (
            <span className="font-bold text-sm">{product.price.toFixed(2)} ETB</span>
          )}
        </div>
        
        <div className="flex items-center justify-between mt-2">
          <span className={`text-xs px-2 py-1 rounded-full ${
            product.status === "active" 
              ? "bg-green-100 text-green-800" 
              : "bg-gray-100 text-gray-800"
          }`}>
            {product.status}
          </span>
          <span className={`text-xs ${product.stock_quantity === 0 ? "text-red-600" : "text-muted-foreground"}`}>
            Stock: {product.stock_quantity}
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <Button variant="ghost" size="sm" onClick={() => handleEdit(product)} className="h-8 w-8 p-0">
          <Pencil className="h-3 w-3" />
        </Button>
        <Button variant="ghost" size="sm" onClick={() => handleDelete(product.id)} className="h-8 w-8 p-0">
          <Trash2 className="h-3 w-3" />
        </Button>
      </div>
    </div>
  </Card>
);

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold">Product Management</h1>
          <p className="text-sm text-muted-foreground">
            Manage and update your store inventory
          </p>
        </div>

        <Dialog open={addOpen} onOpenChange={setAddOpen}>
          <DialogTrigger asChild>
            <Button className="w-full sm:w-auto">
              <Plus className="h-4 w-4 mr-2" /> 
              <span className="hidden sm:inline">Add Product</span>
              <span className="sm:hidden">Add</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
            </DialogHeader>
            <ProductForm
              onSuccess={() => {
                setAddOpen(false);
                fetchProducts();
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Products Count */}
      <div className="bg-muted/50 rounded-lg p-4">
        <div className="flex items-center gap-3">
          <Package className="h-5 w-5 text-muted-foreground" />
          <div>
            <p className="text-sm font-medium">Total Products</p>
            <p className="text-2xl font-bold">{products.length}</p>
          </div>
        </div>
      </div>

      {/* Mobile View - Cards */}
      <div className="block sm:hidden">
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="p-4 animate-pulse">
                <div className="flex gap-3">
                  <div className="w-16 h-16 bg-muted rounded-lg"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-muted rounded w-3/4"></div>
                    <div className="h-3 bg-muted rounded w-1/2"></div>
                    <div className="h-4 bg-muted rounded w-1/4"></div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : products.length === 0 ? (
          <Card className="p-8 text-center">
            <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">No products found</h3>
            <p className="text-muted-foreground mb-4">Get started by adding your first product</p>
            <Button onClick={() => setAddOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </Card>
        ) : (
          <div>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>

      {/* Desktop View - Table */}
<div className="hidden sm:block">
  <Card className="shadow-sm">
    <CardHeader className="pb-3">
      <CardTitle>Product List</CardTitle>
    </CardHeader>
    <CardContent>
      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center gap-4 p-4 animate-pulse">
              <div className="w-12 h-12 bg-muted rounded"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-muted rounded w-1/4"></div>
                <div className="h-3 bg-muted rounded w-1/6"></div>
              </div>
              <div className="h-4 bg-muted rounded w-16"></div>
              <div className="h-4 bg-muted rounded w-16"></div>
              <div className="h-8 bg-muted rounded w-20"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="font-semibold text-lg mb-2">No products found</h3>
                    <p className="text-muted-foreground mb-4">Get started by adding your first product</p>
                    <Button onClick={() => setAddOpen(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Product
                    </Button>
                  </TableCell>
                </TableRow>
              ) : (
                products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      {product.images?.length > 0 ? (
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                          <ImageIcon className="h-5 w-5 text-muted-foreground" />
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{product.name}</div>
                        <div className="text-sm text-muted-foreground">{product.sku}</div>
                      </div>
                    </TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>
                      {/* CORRECTED PRICE DISPLAY */}
                      <div className="flex flex-col">
                        {product.discount_price ? (
                          <>
                            <span className="font-semibold text-green-600">{product.discount_price.toFixed(2)} ETB</span>
                            <span className="text-sm text-muted-foreground line-through">{product.price.toFixed(2)} ETB</span>
                          </>
                        ) : (
                          <span className="font-semibold">{product.price.toFixed(2)} ETB</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={product.stock_quantity === 0 ? "text-red-600 font-semibold" : ""}>
                        {product.stock_quantity}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        product.status === "active" 
                          ? "bg-green-100 text-green-800" 
                          : product.status === "draft"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-gray-100 text-gray-800"
                      }`}>
                        {product.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm" onClick={() => handleEdit(product)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDelete(product.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </CardContent>
  </Card>
</div>

      {/* Edit Dialog */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
          </DialogHeader>
          {editingProduct && (
            <ProductForm
              product={editingProduct}
              onSuccess={() => {
                setEditOpen(false);
                fetchProducts();
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

// ========================
// Product Form
// ========================
function ProductForm({
  product,
  onSuccess,
}: {
  product?: Product;
  onSuccess: () => void;
}) {
  const [formData, setFormData] = useState<any>(
    product || {
      name: "",
      description: "",
      price: "",
      discount_price: "",
      stock_quantity: "",
      category: "",
      tags: "",
      fabric_type: "",
      sizes: "",
      colors: "",
      sku: "",
      status: "active",
      featured: false,
      images: [],
    }
  );
  const [newImages, setNewImages] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setNewImages(Array.from(e.target.files));
  };

  const uploadImages = async (): Promise<string[]> => {
    const urls: string[] = [];
    for (const file of newImages) {
      const ext = file.name.split(".").pop();
      const fileName = `${uuidv4()}.${ext}`;
      const { error } = await supabase.storage.from("product-images").upload(fileName, file);
      if (error) throw error;
      const { data } = supabase.storage.from("product-images").getPublicUrl(fileName);
      urls.push(data.publicUrl);
    }
    return urls;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    try {
      let imageUrls = formData.images || [];
      if (newImages.length > 0) {
        const uploaded = await uploadImages();
        imageUrls = [...imageUrls, ...uploaded];
      }

      const payload = {
        ...formData,
        price: parseFloat(formData.price),
        discount_price: formData.discount_price ? parseFloat(formData.discount_price) : null,
        stock_quantity: parseInt(formData.stock_quantity),
        tags: formData.tags ? formData.tags.split(",").map((t: string) => t.trim()).filter((t: string) => t) : [],
        sizes: formData.sizes ? formData.sizes.split(",").map((s: string) => s.trim()).filter((s: string) => s) : [],
        colors: formData.colors ? formData.colors.split(",").map((c: string) => c.trim()).filter((c: string) => c) : [],
        images: imageUrls,
      };

      if (product) {
        const { error } = await supabase.from("products").update(payload).eq("id", product.id);
        if (error) throw error;
        toast({ title: "✅ Product updated successfully!" });
      } else {
        const { error } = await supabase.from("products").insert([payload]);
        if (error) throw error;
        toast({ title: "✅ Product added successfully!" });
      }

      onSuccess();
    } catch (error: any) {
      toast({ variant: "destructive", title: "Error", description: error.message });
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Basic Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Product Name *</Label>
          <Input 
            id="name" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            required 
            placeholder="Enter product name"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="sku">SKU</Label>
          <Input 
            id="sku" 
            name="sku" 
            value={formData.sku} 
            onChange={handleChange} 
            placeholder="Auto-generated if empty"
          />
        </div>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea 
          id="description" 
          name="description" 
          value={formData.description} 
          onChange={handleChange} 
          rows={3} 
          placeholder="Product description..."
        />
      </div>

      {/* Pricing & Stock */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="price">Price (ETB) *</Label>
          <Input 
            id="price" 
            name="price" 
            type="number" 
            step="0.01" 
            value={formData.price} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="discount_price">Discount Price (ETB)</Label>
          <Input 
            id="discount_price" 
            name="discount_price" 
            type="number" 
            step="0.01" 
            value={formData.discount_price} 
            onChange={handleChange} 
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="stock_quantity">Stock Quantity</Label>
          <Input 
            id="stock_quantity" 
            name="stock_quantity" 
            type="number" 
            value={formData.stock_quantity} 
            onChange={handleChange} 
          />
        </div>
      </div>

      {/* Category & Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Input 
            id="category" 
            name="category" 
            value={formData.category} 
            onChange={handleChange} 
            placeholder="e.g., Clothing, Accessories"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <option value="active">Active</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>

      {/* Product Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="fabric_type">Fabric Type</Label>
          <Input 
            id="fabric_type" 
            name="fabric_type" 
            value={formData.fabric_type} 
            onChange={handleChange} 
            placeholder="e.g., Cotton, Silk"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="sizes">Sizes (comma separated)</Label>
          <Input 
            id="sizes" 
            name="sizes" 
            value={formData.sizes} 
            onChange={handleChange} 
            placeholder="e.g., S, M, L, XL"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="colors">Colors (comma separated)</Label>
          <Input 
            id="colors" 
            name="colors" 
            value={formData.colors} 
            onChange={handleChange} 
            placeholder="e.g., Red, Blue, Green"
          />
        </div>
      </div>

      {/* Tags */}
      <div className="space-y-2">
        <Label htmlFor="tags">Tags (comma separated)</Label>
        <Input 
          id="tags" 
          name="tags" 
          value={formData.tags} 
          onChange={handleChange} 
          placeholder="e.g., summer, casual, new"
        />
      </div>

      {/* Featured */}
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="featured"
          name="featured"
          checked={formData.featured}
          onChange={handleChange}
          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <Label htmlFor="featured" className="text-sm font-medium leading-none">
          Mark as Featured Product
        </Label>
      </div>

      {/* Images */}
      <div className="space-y-3">
        <Label htmlFor="images">Product Images</Label>
        <Input 
          id="images" 
          type="file" 
          multiple 
          accept="image/*" 
          onChange={handleImageChange} 
          className="cursor-pointer"
        />
        
        {formData.images?.length > 0 && (
          <div>
            <Label className="text-sm">Current Images:</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.images.map((url: string, i: number) => (
                <img 
                  key={i} 
                  src={url} 
                  alt={`Product ${i + 1}`} 
                  className="w-16 h-16 object-cover rounded border"
                />
              ))}
            </div>
          </div>
        )}

        {newImages.length > 0 && (
          <div>
            <Label className="text-sm">New Images to Upload:</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {newImages.map((file, index) => (
                <div key={index} className="text-xs bg-muted px-2 py-1 rounded">
                  {file.name}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <Button 
        type="submit" 
        disabled={uploading} 
        className="w-full"
        size="lg"
      >
        <Upload className="h-4 w-4 mr-2" />
        {uploading ? "Saving..." : product ? "Update Product" : "Add Product"}
      </Button>
    </form>
  );
}