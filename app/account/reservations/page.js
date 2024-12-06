import ReservationCard from "@/app/_components/ReservationCard";
import ReservationList from "@/app/_components/ReservationList";
import { auth } from "@/app/_lib/auth";
import { getBookings, getCabinsById } from "@/app/_lib/data-service";
import Link from "next/link";

export const metadata = {
  title: "Reservations",
};

export default async function Page() {
  const session = await auth();
  const bookings = await getBookings(session?.user?.guestId);

  return (
    <div className="px-4 sm:px-6 md:px-8 max-w-4xl mx-auto">
      <h2 className="font-semibold text-xl sm:text-2xl text-accent-400 mb-5 sm:mb-7">
        Your reservations
      </h2>

      {bookings.length === 0 ? (
        <p className="text-base sm:text-lg">
          You have no reservations yet. Check out our{" "}
          <Link className="underline text-accent-500" href="/cabins">
            luxury cabins &rarr;
          </Link>
        </p>
      ) : (
        <ReservationList bookings={bookings} />
      )}
    </div>
  );
}
