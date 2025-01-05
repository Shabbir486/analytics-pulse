import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function AccountSecurity() {
  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Security Settings</CardTitle>
          <CardDescription>Manage your account security and authentication methods</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Security settings will go here</p>
        </CardContent>
      </Card>
    </div>
  );
}