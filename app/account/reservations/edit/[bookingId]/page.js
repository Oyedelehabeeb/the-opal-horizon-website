import SubmitButton from "@/app/_components/SubmitButton";
import { updateReservation } from "@/app/_lib/actions";
import { getBooking, getCabin } from "@/app/_lib/data-service";

export default async function Page({ params }) {
  const { bookingId } = params;

  const { numGuests, observations, cabinId } = await getBooking(bookingId);
  const { maxCapacity } = await getCabin(cabinId);

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <form
        action={updateReservation}
        className="bg-white shadow-md rounded-lg p-6 space-y-6"
      >
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Edit Reservation #{bookingId}
        </h1>

        <div className="space-y-4">
          <div>
            <label
              htmlFor="guests"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              How many guests?
            </label>
            <select
              name="numGuests"
              id="guests"
              defaultValue={numGuests}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option value="" disabled>
                Select number of guests...
              </option>
              {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
                <option key={x} value={x}>
                  {x} {x === 1 ? "guest" : "guests"}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="observations"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Anything we should know about your stay?
            </label>
            <textarea
              name="observations"
              id="observations"
              defaultValue={observations}
              rows={4}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="Additional notes or special requests..."
            />
          </div>
        </div>

        <div className="flex justify-end items-center">
          <SubmitButton pendingLabel="Updating...">
            Update Reservation
          </SubmitButton>
        </div>
      </form>
    </div>
  );
}
