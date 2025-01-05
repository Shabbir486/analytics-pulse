import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface NotificationPreference {
  id: string;
  label: string;
  enabled: boolean;
}

export function AccountNotifications() {
  const [activityNotifications, setActivityNotifications] = useState<NotificationPreference[]>([
    {
      id: "comments",
      label: "Email me when someone comments on my article",
      enabled: true,
    },
    {
      id: "answers",
      label: "Email me when someone answers on my form",
      enabled: false,
    },
    {
      id: "follows",
      label: "Email me when someone follows me",
      enabled: false,
    },
  ]);

  const [applicationNotifications, setApplicationNotifications] = useState<NotificationPreference[]>([
    {
      id: "news",
      label: "News and announcements",
      enabled: false,
    },
    {
      id: "product-updates",
      label: "Weekly product updates",
      enabled: true,
    },
    {
      id: "blog-digest",
      label: "Weekly blog digest",
      enabled: false,
    },
  ]);

  const handleToggle = (
    id: string,
    type: "activity" | "application",
    currentValue: boolean
  ) => {
    if (type === "activity") {
      setActivityNotifications(
        activityNotifications.map((notification) =>
          notification.id === id
            ? { ...notification, enabled: !currentValue }
            : notification
        )
      );
    } else {
      setApplicationNotifications(
        applicationNotifications.map((notification) =>
          notification.id === id
            ? { ...notification, enabled: !currentValue }
            : notification
        )
      );
    }
  };

  return (
    <div className="space-y-6">
      <Card className="flex py-4 px-3">
        <CardHeader className="flex-1 p-1">
          <CardTitle>Activity</CardTitle>
          <CardDescription>
            Manage your activity notification settings below.
          </CardDescription>
        </CardHeader>
        <CardContent className="border rounded-md flex-1 space-y-3 py-2">
          {activityNotifications.map((notification) => (
            <div
              key={notification.id}
              className="flex items-center justify-between"
            >
              <span className="text-sm">{notification.label}</span>
              <Switch
                checked={notification.enabled}
                onCheckedChange={() =>
                  handleToggle(notification.id, "activity", notification.enabled)
                }
              />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="flex py-4 px-3">
        <CardHeader className="flex-1 p-1">
          <CardTitle>Application</CardTitle>
            <CardDescription>
            Manage your application notification settings below.
            </CardDescription>
        </CardHeader>
        <CardContent className="border rounded-md flex-1 space-y-4 py-2">
          {applicationNotifications.map((notification) => (
            <div
              key={notification.id}
              className="flex items-center justify-between"
            >
              <span className="text-sm">{notification.label}</span>
              <Switch
                checked={notification.enabled}
                onCheckedChange={() =>
                  handleToggle(
                    notification.id,
                    "application",
                    notification.enabled
                  )
                }
              />
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button>Save changes</Button>
      </div>
    </div>
  );
}