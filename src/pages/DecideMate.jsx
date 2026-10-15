import React from 'react';
import { Link } from 'react-router-dom';
import { ModernHeader, ModernFooter } from '../components/layout';
import { PreLoader, BackToTop, MouseCursor, FloatingMenu } from '../components/ui';
import Breadcrumb from '../components/sections/Breadcrumb';
import pageBackground from '../assets/img/bg/newbgimage/qn.webp';
import { useSEO } from '../hooks/useSEO';
import { pageSEO } from '../utils/seo';
import { getCommonSchemas, generateBreadcrumbSchema } from '../utils/structuredData';

const SITE = 'https://www.solidevelectrosoft.com';
const SUPPORT_EMAIL = 'admin@solidevelectrosoft.com';

// Store listings link here (App Store "Support URL" and "Privacy Policy URL"), so keep both paths stable.
const DecideMatePage = ({ seo, title, path, children }) => {
  useSEO({
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    canonical: seo.canonical,
    ogType: seo.ogType,
    schemas: [
      ...getCommonSchemas(),
      generateBreadcrumbSchema([
        { name: 'Home', url: `${SITE}/` },
        { name: 'DecideMate Pro', url: `${SITE}/product/decidemate-pro` },
        { name: title, url: `${SITE}${path}` },
      ]),
    ],
  });

  return (
    <div className="App">
      <PreLoader />
      <BackToTop />
      <MouseCursor />
      <ModernHeader />

      <Breadcrumb title={title} backgroundImage={pageBackground} />

      <main>
        <div className="pt-140 pb-140">
          <div className="container">
            <div className="row">
              <div className="col-lg-9">{children}</div>
            </div>
          </div>
        </div>
      </main>

      <ModernFooter />
      <FloatingMenu />
    </div>
  );
};

const MailLink = () => <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>;

export const DecideMateSupport = () => (
  <DecideMatePage seo={pageSEO.decidemateSupport} title="DecideMate Pro Support" path="/decidemate/support">
    <h2>Help with DecideMate Pro</h2>
    <p>
      Email us at <MailLink /> with &quot;DecideMate&quot; in the subject. We reply within one working day
      (Monday to Friday, India time).
    </p>
    <p>To help us answer quickly, please include:</p>
    <ul>
      <li>your phone model and its iOS or Android version;</li>
      <li>the app version (shown on DecideMate Pro&apos;s page in your app store);</li>
      <li>what you did, what you expected and what happened instead (a screenshot helps).</li>
    </ul>

    <h3 className="mt-50">Common questions</h3>
    <h4>Do I need an account?</h4>
    <p>
      You sign in with your email address, Google or Apple. Your decisions and their results are kept on your
      phone; your account only holds your profile.
    </p>
    <h4>How do I delete my account?</h4>
    <p>
      Open Profile and tap Delete account. This removes your sign-in, your profile and your profile photo from our
      servers. Decisions stored on your phone are removed when you uninstall the app. If you cannot sign in any
      more, email us from the address you used and we will delete the account for you.
    </p>
    <h4>I changed phones and my decisions are gone.</h4>
    <p>
      Decisions are stored only on the phone where you made them, so they do not move to a new phone with your
      account.
    </p>

    <p className="mt-50">
      Read the <Link to="/decidemate/privacy">DecideMate Pro privacy policy</Link>.
    </p>
  </DecideMatePage>
);

export const DecideMatePrivacy = () => (
  <DecideMatePage seo={pageSEO.decidematePrivacy} title="DecideMate Pro Privacy Policy" path="/decidemate/privacy">
    <p><em>Effective 15 October 2026. Applies to the DecideMate Pro app for iPhone and Android, version 1.1.</em></p>
    <p>
      DecideMate Pro is made by Solidev Electrosoft Private Limited, India (&quot;we&quot;). This policy explains
      what the app collects, why, and how you can remove it.
    </p>

    <h3 className="mt-40">What we collect</h3>
    <ul>
      <li>
        <strong>Your account.</strong> When you sign in with an email address and password, Google or Apple, we
        receive your email address and, if the sign-in service shares it, your name. Apple may give us a private
        relay email address instead of your real one.
      </li>
      <li>
        <strong>Your profile.</strong> We store your email address, display name, the sign-in method you used, when
        you created the account and last signed in, whether you finished the introduction screens, and your app
        settings.
      </li>
      <li>
        <strong>Your profile photo, if you add one.</strong> The app asks for access to your photos or camera only
        when you choose a photo, and uploads only the photo you pick.
      </li>
    </ul>

    <h3 className="mt-40">What stays on your phone</h3>
    <p>
      The decisions you create, their choices and their results are stored only on your phone. They are not sent
      to us.
    </p>

    <h3 className="mt-40">What we do not do</h3>
    <ul>
      <li>Version 1.1 has no advertising, no analytics and no tracking across other apps or websites.</li>
      <li>We do not sell your data or share it with advertisers.</li>
      <li>We use your email address only for signing in and to answer you when you contact us.</li>
    </ul>

    <h3 className="mt-40">Who processes it</h3>
    <p>
      Sign-in, the profile and the profile photo are handled by Google Firebase (Authentication, Cloud Firestore and
      Cloud Storage) on our behalf. If you sign in with Google or Apple, their own privacy policies also apply to
      that sign-in.
    </p>

    <h3 className="mt-40">How long we keep it and how to delete it</h3>
    <p>
      We keep your account until you delete it. In the app, open Profile and tap Delete account: your sign-in, your
      profile and your profile photo are deleted straight away. Uninstalling the app removes the decisions stored on
      your phone. You can also email <MailLink /> to ask for a copy of your data, a correction or deletion; we reply
      within one working day.
    </p>

    <h3 className="mt-40">Children</h3>
    <p>DecideMate Pro is not meant for children under 13, and we do not knowingly collect their data.</p>

    <h3 className="mt-40">Changes</h3>
    <p>
      If a new version of the app collects something new, we update this page and its date before that version is
      released.
    </p>

    <h3 className="mt-40">Contact</h3>
    <p>
      Questions about this policy: <MailLink />. See also <Link to="/decidemate/support">DecideMate Pro support</Link>.
    </p>
  </DecideMatePage>
);
