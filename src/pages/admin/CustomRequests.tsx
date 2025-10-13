import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface CustomRequest {
  id: string;
  client_name: string;
  client_email: string;
  description: string;
  status: string;
  created_at: string;
}

export default function CustomRequests() {
  const [requests, setRequests] = useState<CustomRequest[]>([]);

  useEffect(() => {
    const fetchRequests = async () => {
      const { data } = await supabase
        .from("custom_design_requests")
        .select("*")
        .order("created_at", { ascending: false });

      if (data) setRequests(data);
    };

    fetchRequests();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Custom Design Requests</h1>
        <p className="text-muted-foreground">Manage custom design requests from clients</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell>{request.client_name}</TableCell>
                  <TableCell>{request.client_email}</TableCell>
                  <TableCell className="max-w-xs truncate">{request.description}</TableCell>
                  <TableCell>
                    <span className="px-2 py-1 rounded text-xs bg-blue-100 text-blue-800">
                      {request.status}
                    </span>
                  </TableCell>
                  <TableCell>{new Date(request.created_at).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}