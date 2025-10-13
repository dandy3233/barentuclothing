import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Inventory() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Inventory</h1>
        <p className="text-muted-foreground">Track and manage stock levels</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Inventory Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Inventory features coming soon.</p>
        </CardContent>
      </Card>
    </div>
  );
}