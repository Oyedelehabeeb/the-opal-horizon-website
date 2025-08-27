import Header from "./_components/Header";
import Logo from "./_components/Logo";
import Navigation from "./_components/Navigation";
import "@/app/_styles/globals.css";
import { Josefin_Sans } from "next/font/google";
import { ReservationProvider } from "./_components/ReservationContext";
import KeepAliveClient from "./_components/KeepAliveClient";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  // title: "The Opal Suites",
  title: {
    template: "%s | The Opal Suites",
    default: "Welcome / The Opal Suites",
  },
  description:
    "Luxurious cabins hotel, located in the heart of the Italian Dolomites.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={` ${josefin.className} antialiased min-h-screen bg-primary-950 text-primary-100 flex flex-col relative`}
      >
        <header>
          <Header />
        </header>
        <div className="flex-1 px-8 py-12 grid">
          <main className="max-w-7xl mx-auto w-full">
            <ReservationProvider>
              <KeepAliveClient />
              {children}
            </ReservationProvider>
          </main>
        </div>
      </body>
    </html>
  );
}
