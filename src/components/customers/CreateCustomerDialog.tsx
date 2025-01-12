import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { toast } from "sonner";

interface CreateCustomerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateCustomerDialog({ open, onOpenChange }: CreateCustomerDialogProps) {
  const [emailVerified, setEmailVerified] = useState(true);
  const [avatar, setAvatar] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("User created successfully!");
    onOpenChange(false);
  };

  const handleImageDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      // Mock image upload
      setAvatar("/lovable-uploads/mock-image.png");
    }
  };

  const handleImageClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      const file = target.files[0];
      if (file) {
        // Mock image upload
        setAvatar("/lovable-uploads/mock-image.png");
      }
    };
    input.click();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-full h-1/2  py-3">
        <DialogHeader>
          <DialogTitle>Create a new user</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-[300px,1fr] gap-6">
                <div className="space-y-4">
                  <div
                    className="border-2 border-dashed rounded-lg p-12 text-center cursor-pointer hover:border-primary/50 transition-colors"
                    onDrop={handleImageDrop}
                    onDragOver={(e) => e.preventDefault()}
                    onClick={handleImageClick}
                  >
                    {avatar ? (
                      <img src={avatar} alt="Avatar" className="max-h-48 mx-auto" />
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
                      <Label>Email verified</Label>
                      <Switch checked={emailVerified} onCheckedChange={setEmailVerified} />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Disabling this will automatically send the user a verification email
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full name</Label>
                      <Input id="fullName" placeholder="Enter full name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email address</Label>
                      <Input id="email" type="email" placeholder="Enter email" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone number</Label>
                      <Input id="phone" placeholder="Enter phone number" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="country">Country</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose a country" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="us">United States</SelectItem>
                          <SelectItem value="uk">United Kingdom</SelectItem>
                          <SelectItem value="ca">Canada</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="state">State/region</Label>
                      <Input id="state" placeholder="Enter state" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input id="city" placeholder="Enter city" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Input id="address" placeholder="Enter address" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zipcode">Zip/code</Label>
                      <Input id="zipcode" placeholder="Enter zip code" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="company">Company</Label>
                      <Input id="company" placeholder="Enter company name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="role">Role</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="content-creator">Content Creator</SelectItem>
                          <SelectItem value="it-admin">IT Administrator</SelectItem>
                          <SelectItem value="financial-planner">Financial Planner</SelectItem>
                          <SelectItem value="hr-recruiter">HR Recruiter</SelectItem>
                          <SelectItem value="graphic-designer">Graphic Designer</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button type="submit">Create user</Button>
              </div>
            </form>
      </DialogContent>
    </Dialog>
  );
}