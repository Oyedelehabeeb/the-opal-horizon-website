import SelectCountry from "@/app/_components/SelectCountry";
import UpdateProfileForm from "@/app/_components/UpdateProfileForm";
import { auth } from "@/app/_lib/auth";
import { getGuest } from "@/app/_lib/data-service";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Update profile",
};

export default async function Page() {
  const session = await auth();

  // Redirect if no session
  if (!session || !session.user) {
    redirect("/login");
  }

  const guest = await getGuest(session.user.email);

  // Redirect if no guest found
  if (!guest) {
    redirect("/");
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="bg-white shadow-md rounded-lg p-6 md:p-8 space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Update Your Guest Profile
          </h2>

          <p className="text-lg text-gray-600 mb-8">
            Provide the following information to make your check-in process
            faster and smoother. We can't wait to welcome you!
          </p>
        </div>

        <UpdateProfileForm guest={guest}>
          <div className="space-y-4">
            <label
              htmlFor="nationality"
              className="block text-sm font-medium text-gray-700"
            >
              Nationality
            </label>
            <SelectCountry
              name="nationality"
              id="nationality"
              className="block w-full px-4 py-3 bg-gray-50 text-gray-900 
                         border border-gray-300 rounded-md shadow-sm 
                         focus:ring-indigo-500 focus:border-indigo-500 
                         transition duration-300 ease-in-out"
              defaultCountry={guest.nationality}
            />
          </div>
        </UpdateProfileForm>
      </div>
    </div>
  );
}
