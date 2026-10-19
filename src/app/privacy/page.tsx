import type { Metadata } from "next";
import Link from "next/link";

import { env } from "@/lib/env";

export const metadata: Metadata = {
  title: `Privacy Policy — ${env.appName}`,
  description: `How ${env.appName} handles your data: what stays in your browser, what is stored if you sign in, and how to delete it.`,
};

const UPDATED = "October 20, 2026";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="font-display text-xl font-bold tracking-tight text-neutral-900">{title}</h2>
      <div className="mt-3 space-y-3 text-[15px] leading-relaxed text-neutral-700">{children}</div>
    </section>
  );
}

function List({ children }: { children: React.ReactNode }) {
  return <ul className="list-disc space-y-1.5 pl-5">{children}</ul>;
}

export default function PrivacyPage() {
  const name = env.appName;

  return (
    <main className="mx-auto w-full max-w-3xl px-5 py-10 sm:py-14">
      <Link
        href="/"
        className="text-sm font-medium text-neutral-600 hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400"
      >
        ← Back to {name}
      </Link>

      <h1 className="mt-6 font-display text-4xl font-extrabold tracking-tight text-neutral-900">
        Privacy Policy
      </h1>
      <p className="mt-2 text-sm text-neutral-500">Last updated: {UPDATED}</p>

      <p className="mt-6 text-[15px] leading-relaxed text-neutral-700">
        {name} is a color playground for picking, converting and saving colors, building palettes and
        previewing them on app and web screens. This policy explains what information the app uses, where it
        is kept, and the choices you have. In short: you can use {name} without an account, and nothing you
        do there is sent to us. If you sign in, your saved colors are stored so they follow you across devices.
      </p>

      <Section title="1. Using the app without an account">
        <p>Without signing in, your data stays in your browser. {name} saves these items in your browser&apos;s local storage:</p>
        <List>
          <li>your recent colors and favorites;</li>
          <li>your settings, such as theme (light, dark or system) and default color format;</li>
          <li>a small flag that remembers you were signed in, so the page loads without flicker.</li>
        </List>
        <p>
          This data never leaves your device unless you sign in. You can remove it at any time by clearing
          site data in your browser.
        </p>
      </Section>

      <Section title="2. Signing in with Google">
        <p>
          Signing in is optional. It uses Google sign-in through Firebase Authentication, a service run by
          Google. When you sign in, we receive from Google:
        </p>
        <List>
          <li>your name, email address and profile photo;</li>
          <li>a unique account ID.</li>
        </List>
        <p>
          We use these only to identify your account and to show your name and photo in the app. We do not
          receive your Google password.
        </p>
      </Section>

      <Section title="3. What we store when you are signed in">
        <p>
          While signed in, the following is saved to your account in Google Firestore, a cloud database, so it
          is available on your other devices:
        </p>
        <List>
          <li>favorite colors and recent colors;</li>
          <li>palettes you create, including their names and colors;</li>
          <li>designs you save from App Preview (color, app category, device, scheme and mode);</li>
          <li>your settings (theme and default color format).</li>
        </List>
        <p>
          Access is limited by security rules so that each signed-in user can read and write only their own
          data. We use this data only to run the features above. We do not sell it, and we do not use it for
          advertising.
        </p>
      </Section>

      <Section title="4. Images you add">
        <p>
          The Image tool reads colors from a picture you choose. The image is processed inside your browser
          and is not uploaded or stored by us. Only the colors it finds are kept, and only if you save them.
        </p>
      </Section>

      <Section title="5. Share links">
        <p>
          A share link contains the color values (and a palette name) in its address. Anyone who has the link
          can see those values. Nothing is stored on our servers when you create a link, so treat a link like
          any message you send: share it only with people you want to see it.
        </p>
      </Section>

      <Section title="6. Clipboard">
        <p>
          {name} writes to your clipboard only when you click a copy or share button. It does not read your
          clipboard.
        </p>
      </Section>

      <Section title="7. Analytics, ads and cookies">
        <p>
          {name} currently does not use analytics, advertising or tracking cookies. Local storage and the
          Firebase sign-in session are used only to make the app work. If we add analytics or ads in the
          future, we will update this policy first and ask for consent where the law requires it.
        </p>
        <p>
          Our hosting provider may keep standard server logs (such as IP address, browser type and the pages
          requested) for security and operations. Fonts are served from our own site and are not loaded from
          a third party when you visit.
        </p>
      </Section>

      <Section title="8. Who processes your data">
        <p>
          {name} relies on Google (Firebase Authentication and Firestore) to sign you in and store your saved
          data, and on a web hosting provider to deliver the site. These providers process data on our behalf
          and under their own terms and privacy policies. Their servers may be in countries other than your
          own. We do not share your data with anyone else, except where required by law.
        </p>
      </Section>

      <Section title="9. Your choices and rights">
        <List>
          <li>
            <strong>Delete your saved data:</strong> when signed in, open Settings and choose the option to
            delete your saved data. This removes your favorites, recents, palettes, designs and settings from
            our database.
          </li>
          <li>
            <strong>Sign out:</strong> use the account menu. Your device keeps only what is described in
            section 1.
          </li>
          <li>
            <strong>Access, correction or account removal:</strong> to see what we hold, fix it, or have your
            sign-in account removed entirely, contact us using the details below.
          </li>
          <li>
            <strong>Clear browser data:</strong> clearing site data in your browser removes everything the app
            stored locally.
          </li>
        </List>
        <p>
          Depending on where you live, including under India&apos;s Digital Personal Data Protection Act, 2023,
          you may have additional rights over your personal data. We will respond to requests within a
          reasonable time.
        </p>
      </Section>

      <Section title="10. Security and retention">
        <p>
          Data is sent over HTTPS, and database access is restricted to your own account. No system is
          perfectly secure, so we cannot guarantee absolute security. We keep your saved data until you delete
          it or ask us to remove your account.
        </p>
      </Section>

      <Section title="11. Children">
        <p>
          {name} is not directed at children. Please do not sign in if you are under 13, or under the age at
          which you may consent to data processing where you live, without a parent or guardian&apos;s
          permission.
        </p>
      </Section>

      <Section title="12. Changes to this policy">
        <p>
          We may update this policy as the app changes. The date at the top shows when it was last revised.
          Material changes will be noted in the app.
        </p>
      </Section>

      <Section title="13. Contact">
        <p>
          {env.contactEmail ? (
            <>
              Questions or requests about your data? Email{" "}
              <a
                href={`mailto:${env.contactEmail}`}
                className="font-medium text-neutral-900 underline underline-offset-2"
              >
                {env.contactEmail}
              </a>
              .
            </>
          ) : (
            <>Questions or requests about your data? Contact the {name} team using the details on our website.</>
          )}
        </p>
      </Section>
    </main>
  );
}
