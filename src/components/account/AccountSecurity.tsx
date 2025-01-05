import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { EyeClosed, EyeIcon } from "lucide-react";

export function AccountSecurity() {
  const [oldPasswordVisible, setOldPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  function togglePasswordVisibility(id: string, setVisible: React.Dispatch<React.SetStateAction<boolean>>): void {
    const input = document.getElementById(id) as HTMLInputElement;
    if (input) {
      const isVisible = input.type === "password";
      input.type = isVisible ? "text" : "password";
      setVisible(isVisible);
    }
  }

  return (
    <Card className="space-y-4 p-4">
      <div className="relative">
        <Input id="old-password" type="password" placeholder="Old password" />
        <button
          type="button"
          className="absolute inset-y-0 right-0 pr-3 flex items-center"
          onClick={() => togglePasswordVisibility('old-password', setOldPasswordVisible)}
        >
          {oldPasswordVisible ? <EyeIcon className="h-5 w-5 text-gray-500" /> : <EyeClosed className="h-5 w-5 text-gray-500" />}
        </button>
      </div>
      <div className="relative">
        <Input id="new-password" type="password" placeholder="New password" />
        <button
          type="button"
          className="absolute inset-y-0 right-0 pr-3 flex items-center"
          onClick={() => togglePasswordVisibility('new-password', setNewPasswordVisible)}
        >
          {newPasswordVisible ? <EyeIcon className="h-5 w-5 text-gray-500" /> : <EyeClosed className="h-5 w-5 text-gray-500" />}
        </button>
      </div>
      <div className="relative">
        <Input id="confirm-password" type="password" placeholder="Confirm New password" />
        <button
          type="button"
          className="absolute inset-y-0 right-0 pr-3 flex items-center"
          onClick={() => togglePasswordVisibility('confirm-password', setConfirmPasswordVisible)}
        >
          {confirmPasswordVisible ? <EyeIcon className="h-5 w-5 text-gray-500" /> : <EyeClosed className="h-5 w-5 text-gray-500" />}
        </button>
      </div>
      <div className="flex justify-end">
        <Button type="submit">Save changes</Button>
      </div>
    </Card>
  );
}