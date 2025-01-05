import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function AccountSocialLinks() {
  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Social Links</CardTitle>
          <CardDescription>Connect your social media accounts</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Social links settings will go here</p>
        </CardContent>
      </Card>
    </div>
  );
}