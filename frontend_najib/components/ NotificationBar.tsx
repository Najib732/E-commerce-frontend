"use client";
import { useEffect, useState } from "react";
import Pusher from "pusher-js";

export default function NotificationsPage() {
  const [messages, setMessages] = useState<{ text: string; isNew: boolean }[]>([]);

  useEffect(() => {
    const pusher = new Pusher("8afefd0184a77fa87da8", {
      cluster: "mt1",
    });

    const channel = pusher.subscribe("my-channel");

    channel.bind("my-event", (data: any) => {
      setMessages((prev) => [
        ...prev,
        { text: data.message, isNew: true },
      ]);

      // Optional: mark as read after 5 seconds
      setTimeout(() => {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.text === data.message ? { ...msg, isNew: false } : msg
          )
        );
      }, 5000);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, []);

  return (
    <div className="p-4">
      <h2 className="font-bold text-lg mb-2">Notifications</h2>
      <ul className="space-y-2">
        {messages.map((msg, index) => (
          <li
            key={index}
            className={`p-2 rounded-md ${
              msg.isNew ? "bg-red-500 text-white" : "bg-gray-100 text-black"
            }`}
          >
            {msg.text}
          </li>
        ))}
      </ul>
    </div>
  );
}
