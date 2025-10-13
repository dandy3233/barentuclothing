import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Customers() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Customers</h1>
        <p className="text-muted-foreground">View and manage customer information</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Customer Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Customer management features coming soon.</p>
        </CardContent>
      </Card>
    </div>
  );
}