import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Blog() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Blog Posts</h1>
        <p className="text-muted-foreground">Create and manage blog content</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Blog Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Blog features coming soon.</p>
        </CardContent>
      </Card>
    </div>
  );
}