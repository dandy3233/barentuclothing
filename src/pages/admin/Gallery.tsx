'use client';

import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Pencil, Trash2, Upload, Image as ImageIcon, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface GalleryItem {
  id: string;
  title: string;
  description?: string;
  image_url: string;
  category: string;
  featured?: boolean;
  display_order: number;
  user_id: string;
}

export default function Gallery() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [user, setUser] = useState<any>(null);
  const { toast } = useToast();

  const fetchItems = async () => {
    setLoading(true);
    let query = supabase
      .from("gallery")
      .select("*")
      .order("display_order", { ascending: true });

    if (user) {
      query = query.eq("user_id", user.id);
    }

    const { data, error } = await query;

    if (!error && data) {
      setItems(data);
    } else if (error) {
      toast({
        variant: "destructive",
        title: "Error fetching items",
        description: error.message,
      });
    }
    setLoading(false);
  };

  const fetchUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
  };

  useEffect(() => {
    fetchUser();
    fetchItems();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return;
    if (!user) {
      toast({ variant: "destructive", title: "User not authenticated" });
      return;
    }
    const { error } = await supabase
      .from("gallery")
      .delete()
      .eq("id", id)
      .eq("user_id", user.id);

    if (!error) {
      toast({ title: "Item deleted successfully" });
      fetchItems();
    } else {
      toast({
        variant: "destructive",
        title: "Error deleting item",
        description: error.message,
      });
    }
  };

  const handleEdit = (item: GalleryItem) => {
    setEditingItem(item);
    setEditDialogOpen(true);
  };

  // Mobile Gallery Card
  const GalleryCard = ({ item }: { item: GalleryItem }) => (
    <Card className="p-4 mb-4">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          {item.image_url ? (
            <img
              src={item.image_url}
              alt={item.title}
              className="w-16 h-16 object-cover rounded-lg"
            />
          ) : (
            <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
              <ImageIcon className="h-6 w-6 text-muted-foreground" />
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <h3 className="font-semibold text-sm truncate">{item.title}</h3>
            {item.featured && (
              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 flex-shrink-0 ml-2" />
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-1 capitalize">{item.category}</p>
          {item.description && (
            <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
              {item.description}
            </p>
          )}
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs text-muted-foreground">
              Order: {item.display_order}
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <Button variant="ghost" size="sm" onClick={() => handleEdit(item)} className="h-8 w-8 p-0">
            <Pencil className="h-3 w-3" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => handleDelete(item.id)} className="h-8 w-8 p-0">
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
          <h1 className="text-2xl sm:text-3xl font-bold">Gallery Management</h1>
          <p className="text-sm text-muted-foreground">
            Manage campaign images and media
          </p>
        </div>

        {!user ? (
          <p className="text-sm text-muted-foreground">Please log in to add items.</p>
        ) : (
          <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="w-full sm:w-auto">
                <Plus className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Add Image</span>
                <span className="sm:hidden">Add</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add Gallery Item</DialogTitle>
              </DialogHeader>
              <GalleryForm
                userId={user.id}
                onSuccess={() => {
                  setAddDialogOpen(false);
                  fetchItems();
                }}
              />
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <ImageIcon className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">Total Items</p>
              <p className="text-2xl font-bold">{items.length}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <Star className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">Featured</p>
              <p className="text-2xl font-bold">
                {items.filter(item => item.featured).length}
              </p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="h-5 w-5 bg-muted rounded-full"></div>
            <div>
              <p className="text-sm font-medium">Categories</p>
              <p className="text-2xl font-bold">
                {new Set(items.map(item => item.category)).size}
              </p>
            </div>
          </div>
        </Card>
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
        ) : items.length === 0 ? (
          <Card className="p-8 text-center">
            <ImageIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">No gallery items found</h3>
            <p className="text-muted-foreground mb-4">Get started by adding your first image</p>
            {user && (
              <Button onClick={() => setAddDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Image
              </Button>
            )}
          </Card>
        ) : (
          <div>
            {items.map((item) => (
              <GalleryCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>

      {/* Desktop View - Table */}
      <div className="hidden sm:block">
        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle>Gallery Items ({items.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-center gap-4 p-4 animate-pulse">
                    <div className="w-12 h-12 bg-muted rounded-lg"></div>
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
                      <TableHead>Title</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Featured</TableHead>
                      <TableHead>Order</TableHead>
                      <TableHead className="w-[100px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {items.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8">
                          <ImageIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                          <h3 className="font-semibold text-lg mb-2">No gallery items found</h3>
                          <p className="text-muted-foreground mb-4">Get started by adding your first image</p>
                          {user && (
                            <Button onClick={() => setAddDialogOpen(true)}>
                              <Plus className="h-4 w-4 mr-2" />
                              Add Image
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ) : (
                      items.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>
                            {item.image_url ? (
                              <img
                                src={item.image_url}
                                alt={item.title}
                                className="w-12 h-12 object-cover rounded-lg"
                              />
                            ) : (
                              <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                                <ImageIcon className="h-5 w-5 text-muted-foreground" />
                              </div>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="font-medium">{item.title}</div>
                          </TableCell>
                          <TableCell>
                            <span className="capitalize px-2 py-1 bg-muted rounded-full text-xs">
                              {item.category}
                            </span>
                          </TableCell>
                          <TableCell>
                            <div className="max-w-[200px]">
                              <p className="text-sm text-muted-foreground truncate">
                                {item.description || "No description"}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>
                            {item.featured ? (
                              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                            ) : (
                              <span className="text-muted-foreground">—</span>
                            )}
                          </TableCell>
                          <TableCell>
                            <span className="text-sm font-mono bg-muted px-2 py-1 rounded">
                              {item.display_order}
                            </span>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-1">
                              <Button variant="ghost" size="sm" onClick={() => handleEdit(item)}>
                                <Pencil className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" onClick={() => handleDelete(item.id)}>
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
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Gallery Item</DialogTitle>
          </DialogHeader>
          {editingItem && (
            <GalleryForm
              item={editingItem}
              userId={editingItem.user_id}
              onSuccess={() => {
                setEditDialogOpen(false);
                fetchItems();
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function GalleryForm({
  item,
  userId,
  onSuccess,
}: {
  item?: GalleryItem;
  userId: string;
  onSuccess: () => void;
}) {
  const [formData, setFormData] = useState(
    item || {
      title: "",
      description: "",
      image_url: "",
      category: "",
      featured: false,
      display_order: 0,
    }
  );
  const [newImage, setNewImage] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (item) setFormData(item);
  }, [item]);

  const handleImageUpload = async () => {
    if (!newImage) {
      toast({ variant: "destructive", title: "No image selected" });
      return;
    }
    const imageUrl = await uploadImage(newImage);
    if (imageUrl) {
      setFormData({ ...formData, image_url: imageUrl });
      setNewImage(null);
      toast({ title: "Image uploaded successfully" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let updatedImageUrl = formData.image_url;
    if (newImage) {
      const imageUrl = await uploadImage(newImage);
      if (imageUrl) {
        updatedImageUrl = imageUrl;
      } else {
        return;
      }
    }

    if (!updatedImageUrl) {
      toast({ variant: "destructive", title: "Please upload an image first" });
      return;
    }

    const payload = {
      ...formData,
      image_url: updatedImageUrl,
      user_id: userId,
    };

    if (!item) {
      const { data: maxData, error: maxError } = await supabase.rpc("get_max_display_order", {
        p_user_id: userId,
      });

      if (maxError) {
        toast({
          variant: "destructive",
          title: "Error setting order",
          description: maxError.message,
        });
        return;
      }

      payload.display_order = (maxData || 0) + 1;
    }

    let result;
    if (item) {
      const { error } = await supabase
        .from("gallery")
        .update(payload)
        .eq("id", item.id)
        .eq("user_id", userId);
      result = { error };
    } else {
      const { error } = await supabase.from("gallery").insert([payload]);
      result = { error };
    }

    if (!result.error) {
      toast({ title: item ? "✅ Item updated successfully!" : "✅ Item added successfully!" });
      onSuccess();
    } else {
      toast({
        variant: "destructive",
        title: "Error saving item",
        description: result.error.message,
      });
    }
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    if (!file) return null;
    setUploading(true);
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${uuidv4()}.${fileExt}`;
      const { error } = await supabase.storage
        .from("gallery-images")
        .upload(fileName, file, { upsert: true });

      if (error) {
        toast({
          variant: "destructive",
          title: "Upload failed",
          description: error.message,
        });
        return null;
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from("gallery-images").getPublicUrl(fileName);

      return publicUrl;
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Upload error",
        description: (error as Error).message,
      });
      return null;
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Title */}
      <div className="space-y-2">
        <Label htmlFor="title">Title *</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) =>
            setFormData({ ...formData, title: e.target.value })
          }
          required
          placeholder="Enter image title"
        />
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description || ""}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          rows={3}
          placeholder="Enter image description"
        />
      </div>

      {/* Category & Featured */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select
            value={formData.category}
            onValueChange={(value) =>
              setFormData({ ...formData, category: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="campaign">Campaign</SelectItem>
              <SelectItem value="behind-scenes">Behind Scenes</SelectItem>
              <SelectItem value="editorial">Editorial</SelectItem>
              <SelectItem value="runway">Runway</SelectItem>
              <SelectItem value="lookbook">Lookbook</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="featured">Featured</Label>
          <Select
            value={formData.featured ? "true" : "false"}
            onValueChange={(value) =>
              setFormData({ ...formData, featured: value === "true" })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select if featured" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="true">Yes</SelectItem>
              <SelectItem value="false">No</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Display Order */}
      <div className="space-y-2">
        <Label htmlFor="display_order">Display Order</Label>
        <Input
          id="display_order"
          type="number"
          value={formData.display_order}
          onChange={(e) =>
            setFormData({
              ...formData,
              display_order: parseInt(e.target.value) || 0,
            })
          }
          disabled={!item}
          placeholder="Display order number"
        />
        <p className="text-xs text-muted-foreground">
          {!item ? "Auto-assigned for new items" : "Lower numbers appear first"}
        </p>
      </div>

      {/* Image Upload */}
      <div className="space-y-3">
        <Label>Image *</Label>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
          <Input
            id="image"
            type="file"
            accept="image/*"
            onChange={(e) => setNewImage(e.target.files?.[0] || null)}
            disabled={uploading}
            className="flex-1"
          />
          <Button
            type="button"
            size="sm"
            onClick={handleImageUpload}
            disabled={uploading || !newImage}
            className="w-full sm:w-auto"
          >
            <Upload className="h-4 w-4 mr-2" />
            {uploading ? "Uploading..." : "Upload"}
          </Button>
        </div>
        
        {/* Image Preview */}
        {formData.image_url && (
          <div className="mt-2">
            <Label className="text-sm">Current Image:</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              <img
                src={formData.image_url}
                alt="Preview"
                className="w-32 h-32 object-cover rounded border"
              />
            </div>
          </div>
        )}

        {newImage && (
          <div>
            <Label className="text-sm">New Image to Upload:</Label>
            <div className="text-xs bg-muted px-2 py-1 rounded mt-1 inline-block">
              {newImage.name}
            </div>
          </div>
        )}
      </div>

      <Button 
        type="submit" 
        className="w-full" 
        disabled={uploading}
        size="lg"
      >
        <Upload className="h-4 w-4 mr-2" />
        {uploading ? "Saving..." : item ? "Update Item" : "Add Item"}
      </Button>
    </form>
  );
}