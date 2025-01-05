import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { toast } from "sonner";

export function AccountGeneral() {
  const [publicProfile, setPublicProfile] = useState(true);
  const [avatar, setAvatar] = useState<string | null>(null);

  const handleImageDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setAvatar("/lovable-uploads/131888a4-1a65-4e2a-96cc-eaa83a7e4ac5.png");
    }
  };

  const handleImageClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e: any) => {
      const file = e.target.files[0];
      if (file) {
        setAvatar("/lovable-uploads/131888a4-1a65-4e2a-96cc-eaa83a7e4ac5.png");
      }
    };
    input.click();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Changes saved successfully!");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-[300px,1fr] gap-8">
        <div className="space-y-4">
          <div
            className="border-2 border-dashed rounded-lg p-12 text-center cursor-pointer hover:border-primary/50 transition-colors"
            onDrop={handleImageDrop}
            onDragOver={(e) => e.preventDefault()}
            onClick={handleImageClick}
          >
            {avatar ? (
              <img src={avatar} alt="Avatar" className="max-h-48 mx-auto rounded-full" />
            ) : (
              <div className="space-y-2">
                <div className="mx-auto w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <div className="text-sm text-muted-foreground">
                  Upload photo
                </div>
                <div className="text-xs text-muted-foreground">
                  Allowed *.jpeg, *.jpg, *.png, *.gif
                  <br />
                  max size of 3 Mb
                </div>
              </div>
            )}
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Public profile</Label>
              <Switch checked={publicProfile} onCheckedChange={setPublicProfile} />
            </div>
            <p className="text-sm text-muted-foreground">
              When disabled, your profile will not be visible to other users
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" defaultValue="Jaydon Frankie" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input id="email" type="email" defaultValue="demo@minimals.cc" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone number</Label>
              <Input id="phone" defaultValue="(416) 555-0198" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input id="address" defaultValue="90210 Broadway Blvd" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Input id="country" defaultValue="Canada" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">State/Region</Label>
              <Input id="state" defaultValue="California" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input id="city" defaultValue="San Francisco" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="zipcode">Zip/Code</Label>
              <Input id="zipcode" defaultValue="94116" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="about">About</Label>
            <Textarea 
              id="about" 
              defaultValue="Praesent turpis. Phasellus viverra nulla ut metus varius laoreet. Phasellus tempus."
              className="min-h-[100px]"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit">Save changes</Button>
      </div>
    </form>
  );
}