import { cookies } from "next/headers";
import { vrefyTokenForPage } from "@/lib/utils/veryfyToken";
import Header from "@/auth/components/HeaderComponets/Header";
import BadySC from "@/auth/components/HeroToursComponets/id/BadySC";
//  ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
export default async function TourPage({ params }) {
  
  //  ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  const { id } = params;
  const isUUID =
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(
      id
    );
  if (!isUUID) {
    return <div>There is no data for this trip. ❌</div>;
  }
  //  ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("jwttoken")?.value;
    const user = vrefyTokenForPage(token);
    //  ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

    return (
      <main className="flex flex-col items-center justify-center">
        <Header user={user} />
        <BadySC user={user}/>
      </main>
    );
  } catch (error) {
    console.error("Error fetching flight: ❌", error);
    return <p>Flight not available ❌</p>;
  }
}
