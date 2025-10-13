import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Collection {
  id: string;
  name: string;
  season?: string;
  status: string;
  created_at: string;
}

export default function Collections() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();

  const fetchCollections = async () => {
    const { data } = await supabase
      .from("collections")
      .select("*")
      .order("created_at", { ascending: false });

    if (data) setCollections(data);
  };

  useEffect(() => {
    fetchCollections();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Collections</h1>
          <p className="text-muted-foreground">Organize products into collections</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Collection
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Collection</DialogTitle>
            </DialogHeader>
            <CollectionForm onSuccess={() => { setDialogOpen(false); fetchCollections(); }} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {collections.map((collection) => (
          <Card key={collection.id}>
            <CardHeader>
              <CardTitle>{collection.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Season: {collection.season || "N/A"}</p>
              <p className="text-sm">Status: {collection.status}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function CollectionForm({ onSuccess }: { onSuccess: () => void }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    season: "",
    status: "active",
  });
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const { error } = await supabase.from("collections").insert([formData]);

    if (!error) {
      toast({ title: "Collection created successfully" });
      onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="season">Season</Label>
        <Input
          id="season"
          value={formData.season}
          onChange={(e) => setFormData({ ...formData, season: e.target.value })}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
      </div>
      <Button type="submit" className="w-full">Create Collection</Button>
    </form>
  );
}