import Header from "@/auth/components/Header";
import { cookies } from "next/headers";
import Image from "next/image";
import { vrefyTokenForPage } from "@/lib/utils/veryfyToken";



export default async function EgyptVisaPage() {
  const cookieStore = await cookies(); // ✅ استخدم await
const token = cookieStore.get("jwttoken")?.value;
const user = vrefyTokenForPage(token);
  return (
    <main className="w-full flex flex-col items-center justify-center bg-white text-[#002147] font-sans">
      <Header user={user} />
      {/* Header Section */}
      <section className="relative w-full h-[600px] bg-gradient-to-b from-blue-100 to-white">
        <Image
          src="/assets/Copilot_20250922_151913.png"
          alt="Egypt Visa Banner"
          fill
          className="object-cover bg-bottom z-0"
          priority
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black/30 z-10" />
        <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-6">
          <h1 className="text-white text-6xl font-bold tracking-wide">
            EGYPT VISA
          </h1>
          <p className="mt-4 text-white text-2xl font-semibold">
            Discover Egypt – Apply for Your Tourist Visa Now
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section
        style={{ padding: "20px" }}
        className="container mx-auto px-6 py-16 space-y-12 flex  flex-col gap-8 mb-3"
      >
        {/* Who Can Apply */}
        <div className="container">
          <h2 className="text-3xl font-bold mb-4">Who Can Apply?</h2>
          <p className="text-lg leading-relaxed">
            Citizens of over 70 countries are eligible for an eVisa, including:
            United States, Canada, European Union countries, Gulf nations,
            Japan, and Australia.
          </p>
        </div>

        {/* Types of Visas */}
        <div>
          <h2 className="text-3xl font-bold mb-4">Types of Visas</h2>
          <div className="overflow-x-auto">
            <table className="w-full border border-[#d4a85f] text-left">
              <thead className="bg-[#ff9800] text-white">
                <tr>
                  <th className="px-4 py-2">Type</th>
                  <th className="px-4 py-2">Description</th>
                  <th className="px-4 py-2">Duration</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="px-4 py-2">eVisa (Single Entry)</td>
                  <td className="px-4 py-2">Apply online before travel</td>
                  <td className="px-4 py-2">Up to 30 days</td>
                </tr>
                <tr className="border-t">
                  <td className="px-4 py-2">Multiple Entry Visa</td>
                  <td className="px-4 py-2">Multiple visits within 6 months</td>
                  <td className="px-4 py-2">30 days per visit</td>
                </tr>
                <tr className="border-t">
                  <td className="px-4 py-2">Visa on Arrival</td>
                  <td className="px-4 py-2">
                    Available at airports for select nationalities
                  </td>
                  <td className="px-4 py-2">Varies</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Basic Requirements */}
        <div>
          <h2 className="text-3xl font-bold mb-4">Basic Requirements</h2>
          <ul className="list-disc list-inside space-y-2 text-lg">
            <li>Passport valid for at least 6 months</li>
            <li>Recent passport-sized photo</li>
            <li>Trip details (arrival date, accommodation)</li>
            <li>Active email address</li>
            <li>Visa or Mastercard for payment</li>
          </ul>
        </div>

        {/* Fees */}
        <div>
          <h2 className="text-3xl font-bold mb-4">Fees</h2>
          <table className="w-full border border-[#ff9800] text-left">
            <thead className="bg-[#d4a85f] text-white">
              <tr>
                <th className="px-4 py-2">Visa Type</th>
                <th className="px-4 py-2">Fee (USD)</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="px-4 py-2">Single Entry</td>
                <td className="px-4 py-2">$25</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">Multiple Entry</td>
                <td className="px-4 py-2">$60</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Application Steps */}
        <div>
          <h2 className="text-3xl font-bold mb-4">
            Electronic Application Steps
          </h2>
          <ol className="list-decimal list-inside space-y-2 text-lg">
            <li>Register on the official portal</li>
            <li>Fill out the application form</li>
            <li>Upload passport and photo</li>
            <li>Pay fees electronically</li>
            <li>Receive visa via email within 7 business days</li>
          </ol>
          <div className="mt-4 space-x-4">
            <a
              href="https://www.visa2egypt.gov.eg/eVisa/en/"
              target="_blank"
              className="text-[#ff9800] font-semibold underline"
            >
              Apply via the official portal
            </a>
            <a
              href="https://www.presidency.eg/en/projects/evisa/"
              target="_blank"
              className="text-[#d4a85f] font-semibold underline"
              style={{ marginLeft: "20px" }}
            >
              Read article from the Egyptian presidency
            </a>
          </div>
        </div>

        {/* Important Notes */}
        <div>
          <h2 className="text-3xl font-bold mb-4">Important Notes</h2>
          <ul className="list-disc list-inside space-y-2 text-lg">
            <li>Apply at least 7 days before travel</li>
            <li>eVisa does not permit work or study</li>
            <li>Passport officers may deny entry without explanation</li>
            <li>Always carry a printed copy of your visa</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
          <p className="text-lg">
            Ministry of Tourism & Antiquities
            <br />
            📧 Email:{" "}
            <a
              href="mailto:visa@egypt.gov.eg"
              className="text-[#ff9800] underline"
            >
              visa@egypt.gov.eg
            </a>
            <br />
            📞 Hotline: <span className="font-semibold">19654</span>
          </p>
        </div>
      </section>
    </main>
  );
}
