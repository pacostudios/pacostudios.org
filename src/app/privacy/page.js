import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | Paco Studios",
  description: "How Paco Studios collects, uses and protects your information.",
  alternates: { canonical: "https://pacostudios.org/privacy" },
};

// TODO: real data. This is placeholder wording; replace it with the reviewed
// privacy policy text before relying on it.
const LAST_UPDATED = "TODO: date";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white px-4 lg:px-16 py-12 lg:py-20">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/"
          className="text-sm lg:text-base hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
        >
          ← Back to Paco Studios
        </Link>

        <div className="bg-[#EB6E00] w-fit px-6 py-3 font-bold text-3xl lg:text-[42px] mt-8 mb-4">
          • PRIVACY POLICY
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-10">
          Last updated: {LAST_UPDATED}
        </p>

        <div className="space-y-8 font-[Public_Sans] text-base lg:text-lg leading-relaxed">
          <section>
            <h2 className="text-[#EB6E00] text-xl lg:text-2xl font-semibold mb-3">
              What we collect
            </h2>
            <p>
              When you use the contact form on this site we collect the name,
              email address and phone number you enter. We also use Google
              Analytics, which collects anonymous usage data such as pages
              visited, device type and approximate location.
            </p>
          </section>

          <section>
            <h2 className="text-[#EB6E00] text-xl lg:text-2xl font-semibold mb-3">
              How we use it
            </h2>
            <p>
              We use your contact details only to reply to your enquiry and
              discuss your project. We use analytics data to understand how the
              site is used and to improve it. We do not sell your information.
            </p>
          </section>

          <section>
            <h2 className="text-[#EB6E00] text-xl lg:text-2xl font-semibold mb-3">
              Storage and retention
            </h2>
            <p>TODO: real data. Where enquiries are stored and how long they are kept.</p>
          </section>

          <section>
            <h2 className="text-[#EB6E00] text-xl lg:text-2xl font-semibold mb-3">
              Your rights
            </h2>
            <p>
              TODO: real data. Rights under the Australian Privacy Act 1988 and
              India&apos;s Digital Personal Data Protection Act 2023 (access,
              correction, deletion).
            </p>
          </section>

          <section>
            <h2 className="text-[#EB6E00] text-xl lg:text-2xl font-semibold mb-3">
              Contact us
            </h2>
            <p>
              For any privacy question or request, email{" "}
              <a
                href="mailto:pacostudios.work@gmail.com"
                className="underline hover:text-[#EB6E00]"
              >
                pacostudios.work@gmail.com
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
