import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Lookbooks() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Lookbooks</h1>
        <p className="text-muted-foreground">Create and manage lookbooks</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lookbook Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Lookbook features coming soon.</p>
        </CardContent>
      </Card>
    </div>
  );
}