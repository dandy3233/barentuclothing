import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Gallery() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Gallery</h1>
        <p className="text-muted-foreground">Manage campaign images and media</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Gallery Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Gallery features coming soon.</p>
        </CardContent>
      </Card>
    </div>
  );
}