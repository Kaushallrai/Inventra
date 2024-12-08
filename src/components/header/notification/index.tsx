"use client";
import React, { useState } from "react";
import { BellRing, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface Notification {
  id: string;
  title: string;
  description: string;
  read: boolean;
}

export function NotificationPopover() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "Your call has been confirmed.",
      description: "1 hour ago",
      read: false,
    },
    {
      id: "2",
      title: "You have a new message!",
      description: "1 hour ago",
      read: false,
    },
    {
      id: "3",
      title: "Your subscription is expiring soon!",
      description: "2 hours ago",
      read: false,
    },
  ]);

  const [pushNotificationsEnabled, setPushNotificationsEnabled] =
    useState(false);

  const markAllAsRead = () => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) => ({
        ...notification,
        read: false,
      }))
    );
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <BellRing className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-white text-xs">
              {unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0" align="end">
        <Card className="w-[380px] border-none shadow-none">
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>
              You have {unreadCount} unread{" "}
              {unreadCount === 1 ? "message" : "messages"}.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex items-center space-x-4 rounded-md border p-4">
              <BellRing />
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">
                  Push Notifications
                </p>
                <p className="text-sm text-muted-foreground">
                  Send notifications to your device.
                </p>
              </div>
              <Switch
                checked={pushNotificationsEnabled}
                onCheckedChange={(checked) =>
                  setPushNotificationsEnabled(checked)
                }
              />
            </div>
            <div className="grid grid-cols-1 gap-4">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={cn(
                    "grid grid-cols-[25px_1fr] items-start rounded-md border p-4 ",
                    !notification.read && "bg-gray-100"
                  )}
                >
                  {!notification.read && (
                    <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                  )}
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {notification.title}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {notification.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full"
              onClick={markAllAsRead}
              disabled={unreadCount === 0}
            >
              <Check className="mr-2 h-4 w-4" /> Mark all as read
            </Button>
          </CardFooter>
        </Card>
      </PopoverContent>
    </Popover>
  );
}

export default NotificationPopover;
