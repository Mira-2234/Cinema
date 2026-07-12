import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AddItemForm from "@/components/items/AddItemForm";

export default async function AddItemPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("cinema_auth_token")?.value;

  if (!token) {
    redirect("/login?redirect=/items/add");
  }

  return (
    <main className="min-h-screen bg-[#0B0B0B] px-5 pt-28 pb-20">
      <div className="mx-auto max-w-2xl">
        <div className="mb-10 text-center">
          <p className="text-sm uppercase tracking-[6px] text-red-500">
            Contribute
          </p>
          <h1
            className="mt-3 text-4xl text-white"
            style={{ fontFamily: "var(--font-bebas)" }}
          >
            Add a Movie
          </h1>
          <p className="mt-3 text-gray-400">
            Share a movie with the ReelBox community.
          </p>
        </div>

        <AddItemForm />
      </div>
    </main>
  );
}