export const metadata = {
  title: "MQTT Dashboard",
  description: "Realtime MQTT Dashboard with Next.js + Vercel",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
