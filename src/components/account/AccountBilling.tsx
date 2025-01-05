import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function AccountBilling() {
  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Billing Information</CardTitle>
          <CardDescription>Manage your billing information and payment methods</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Billing content will go here</p>
        </CardContent>
      </Card>
    </div>
  );
}