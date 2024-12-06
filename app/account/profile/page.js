import SelectCountry from "@/app/_components/SelectCountry";
import UpdateProfileForm from "@/app/_components/UpdateProfileForm";
import { auth } from "@/app/_lib/auth";
import { getGuest } from "@/app/_lib/data-service";

export const metadata = {
  title: "Update Profile",
};

export default async function Page() {
  const session = await auth();
  const guest = await getGuest(session.user.email);

  return (
    <div className="px-4 sm:px-6 md:px-8 max-w-2xl mx-auto">
      <h2 className="font-semibold text-xl sm:text-2xl text-accent-400 mb-3 sm:mb-4">
        Update your guest profile
      </h2>

      <p className="text-base sm:text-lg mb-6 sm:mb-8 text-primary-200">
        Providing the following information will make your check-in process
        faster and smoother. See you soon!
      </p>

      <UpdateProfileForm guest={guest}>
        <SelectCountry
          name="nationality"
          id="nationality"
          className="px-3 sm:px-5 py-2 sm:py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm text-sm sm:text-base"
          defaultCountry={guest.nationality}
        />
      </UpdateProfileForm>
    </div>
  );
}
