"use client";
import { useEffect, useState } from "react";
import mqtt from "mqtt";

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [status, setStatus] = useState("Connecting...");

  useEffect(() => {
    const client = mqtt.connect(process.env.NEXT_PUBLIC_MQTT_URL, {
      username: process.env.NEXT_PUBLIC_MQTT_USER,
      password: process.env.NEXT_PUBLIC_MQTT_PASS,
    });

    client.on("connect", () => {
      setStatus("Connected ✅");
      client.subscribe("sensor/cabai");
    });

    client.on("message", (topic, message) => {
      setMessages(prev => [...prev, `${topic}: ${message.toString()}`]);
    });

    client.on("error", (err) => {
      setStatus("Error: " + err.message);
    });

    return () => {
      client.end();
    };
  }, []);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4">🌶️ Dashboard Cabai</h1>
      <p className="mb-4">{status}</p>
      <div className="w-full max-w-md bg-white p-4 rounded-xl shadow">
        <h2 className="text-xl mb-2">Data MQTT:</h2>
        <ul className="space-y-1">
          {messages.map((msg, i) => (
            <li key={i} className="p-2 bg-gray-50 rounded">{msg}</li>
          ))}
        </ul>
      </div>
    </main>
  );
}
