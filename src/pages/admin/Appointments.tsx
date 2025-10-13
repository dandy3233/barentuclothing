import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface Appointment {
  id: string;
  client_name: string;
  client_email: string;
  appointment_type: string;
  appointment_date: string;
  status: string;
}

export default function Appointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      const { data } = await supabase
        .from("appointments")
        .select("*")
        .order("appointment_date", { ascending: true });

      if (data) setAppointments(data);
    };

    fetchAppointments();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Appointments</h1>
        <p className="text-muted-foreground">Manage studio visits and fittings</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming Appointments</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {appointments.map((apt) => (
                <TableRow key={apt.id}>
                  <TableCell>{apt.client_name}</TableCell>
                  <TableCell>{apt.client_email}</TableCell>
                  <TableCell>{apt.appointment_type}</TableCell>
                  <TableCell>{new Date(apt.appointment_date).toLocaleString()}</TableCell>
                  <TableCell>
                    <span className="px-2 py-1 rounded text-xs bg-blue-100 text-blue-800">
                      {apt.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}