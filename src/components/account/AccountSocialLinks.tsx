import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "../ui/input";
import { Facebook, Instagram, LinkedinIcon, TwitterIcon } from "lucide-react";

export function AccountSocialLinks() {
  return (
    <div className="grid gap-6">
      <Card className="space-y-4 p-2">
        <div className="relative">
          <Input id="link-1" type="text" readOnly defaultValue={'https://www.facebook.com/caitlyn.kerluke'} className="pl-10 cursor-pointer hover:text-blue-400 focus-visible:ring-offset-0 focus-visible:ring-0" />
          <Facebook className="h-5 w-5 text-blue-500 absolute top-1/2 transform -translate-y-1/2 left-2" />
        </div>
        <div className="relative">
          <Input id="link-1" type="text" readOnly defaultValue={'https://www.facebook.com/caitlyn.kerluke'} className="pl-10 cursor-pointer hover:text-blue-400 focus-visible:ring-offset-0 focus-visible:ring-0" />
          <Instagram className="h-5 w-5 text-pink-500 absolute top-1/2 transform -translate-y-1/2 left-2" />
        </div>
        <div className="relative">
          <Input id="link-1" type="text" readOnly defaultValue={'https://www.facebook.com/caitlyn.kerluke'} className="pl-10 cursor-pointer hover:text-blue-400 focus-visible:ring-offset-0 focus-visible:ring-0" />
          <LinkedinIcon className="h-5 w-5 text-blue-500 absolute top-1/2 transform -translate-y-1/2 left-2" />
        </div>
        <div className="relative">
          <Input id="link-1" type="text" readOnly defaultValue={'https://www.facebook.com/caitlyn.kerluke'} className="pl-10 cursor-pointer hover:text-blue-400 focus-visible:ring-offset-0 focus-visible:ring-0" />
          <TwitterIcon className="h-5 w-5 text-blue-500 absolute top-1/2 transform -translate-y-1/2 left-2" />
        </div>
      
      </Card>
    </div>
  );
}