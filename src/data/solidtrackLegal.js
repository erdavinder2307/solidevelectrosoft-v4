// SolidTrack: privacy policy, terms and support text (SE-4140).
//
// Privacy and Terms are the app's own text, word for word, from the in-app screens
// lib/features/user/screens/privacy_policy_screen.dart and terms_conditions_screen.dart (branch
// origin/develop of the app repo, "Last updated: August 5, 2026"). Do not reword them here: change the app
// first, then copy the text across. `node scripts/checkSolidtrackLegal.js` (set SOLIDTRACK_APP_REPO) compares
// this file with the app and fails on any difference. No new legal wording belongs in this file.
//
// A section body is a list of blocks (the app separates blocks with a blank line). Inside a block, a line that
// starts with "• " is a bullet, as in the app. The support page is written for the site from facts in the app
// code (see the comments on each answer).

export const SOLIDTRACK = {
  name: 'SolidTrack',
  company: 'Solidev Electrosoft Private Limited',
  // ProductionConfig.supportInfo['email'] (lib/core/config/production_config.dart), also the app's Help & Feedback > Contact Support address.
  email: 'davinder@solidevelectrosoft.com',
  // "Last updated" shown on the privacy and terms screens.
  updated: 'August 5, 2026',
  appStoreUrl: 'https://apps.apple.com/app/id6751640011',
};

// Each page: title, intro (blocks), sections [{ heading, body: [blocks] }].
export const LEGAL_PAGES = {
  privacy: {
    slug: 'privacy',
    title: 'Privacy Policy',
    seoTitle: 'SolidTrack Privacy Policy',
    description:
      'How the SolidTrack fitness app handles your data: account details, workouts, optional Apple Health and location, AI coaching, analytics, and how to delete your account.',
    showUpdated: true,
    intro: [
      'SolidTrack ("we", "us", "our") is developed by Solid & Electrosoft. This policy explains what information SolidTrack collects, how it\'s used, and the third-party services it relies on. Using the app means you agree to this policy.',
    ],
    sections: [
      {
        heading: 'Information You Provide',
        body: [
          'When you create an account we collect the details tied to the sign-in method you chose:\n• Email and password — your email address\n• Phone number — your phone number, so we can send you a one-time code by SMS to verify it\n• Google — your name, email address, and Google profile photo\n• Apple — your name and email address (if you use Apple\'s "Hide My Email", we only ever see the relay address Apple gives us)',
          "As you use the app you create fitness data: workouts, exercises, sets/reps/weights, body measurements, fitness goals, meal logs, and any progress photos you choose to add. This data is stored in your account and used to power the app's core features — tracking, progress charts, and AI coaching.",
        ],
      },
      {
        heading: 'Verifying Your Email or Phone',
        body: [
          'If you sign up with an email address, we send a verification link to it and ask you to confirm it before continuing — this protects your account and makes password recovery possible. If you sign in with a phone number, Firebase sends a one-time code to that number by SMS. Your phone number is used for authentication only; we do not send you marketing texts.',
        ],
      },
      {
        heading: 'Apple Health Data (Optional)',
        body: [
          "If you grant permission, SolidTrack uses Apple HealthKit while a workout is in progress:\n• With the Apple Watch app — heart rate and active calories are recorded during that session, plus distance measured by the Watch's own sensors\n• On iPhone alone — a workout you log is saved to Apple Health (type, start/end time, duration, and where measured, distance and calories) so it counts toward your Activity rings",
          'To avoid saving the same session twice when your Watch already recorded it, we also read your existing Health workouts to check whether one already covers that time. That check is the only reason we read them, and nothing read in it is stored by us or sent anywhere.',
          'We never sell or share HealthKit data with any third party, data broker, or advertiser, and never use it for advertising or marketing of any kind. We do not request background or passive health monitoring. You control this access at any time in iOS Settings > Privacy & Security > Health, independently of your SolidTrack account.',
        ],
      },
      {
        heading: 'Location (Outdoor Cardio Only)',
        body: [
          'If you start an outdoor cardio session (an outdoor run, walk, or ride) and grant permission, SolidTrack reads your device location for the duration of that session only, to measure how far you travelled and at what pace.',
          'Your position is used to calculate the distance between successive points, and only that distance in metres is saved with your workout. The underlying location readings are discarded as soon as the distance is calculated.',
          'We do NOT store your coordinates — not on your device, not on our servers. We do NOT record, save, or upload your route or map. We do NOT collect location outside an active session you started. We do NOT use location for advertising, profiling, or tracking you across apps.',
          'An outdoor session keeps measuring while your screen is off, which is what makes a run measurable at all — on iPhone this shows as the status-bar location indicator, on Android as an ongoing notification. Ending the session stops location access immediately. Indoor cardio does not use location at all.',
          'You can decline location and still use every cardio feature by entering distance yourself, and you can revoke access anytime in iOS Settings > Privacy & Security > Location Services, or Android Settings > Apps > SolidTrack > Permissions.',
        ],
      },
      {
        heading: 'AI Coaching',
        body: [
          'When you use the AI Coach or ask for workout, meal, or set suggestions, relevant context is sent to an AI provider to generate a response. Depending on the feature and which provider is available, that is Anthropic (Claude), Amazon Web Services (Bedrock, which hosts Claude), or Google (Gemini).',
          'We send only what the feature needs — your fitness profile, the exercise or meal information relevant to the request, and your recent workout history. We do not send your name, email address, phone number, or your photos. None of these providers retain the data beyond the API call.',
        ],
      },
      {
        heading: 'Advertising & Attribution',
        body: [
          'We advertise SolidTrack and measure whether that advertising works. This is the only part of the app that shares anything with an advertising company, and the only thing we are trying to learn is which campaign led to an install or a subscription.',
          "On iPhone and iPad, the first time you open SolidTrack we show Apple's App Tracking Transparency prompt. If you decline or never answer, no advertising identifier is collected and nothing is linked to you across other companies' apps or websites. If you allow it, your device's advertising identifier (IDFA) may be shared with Google Ads, along with the fact that an install, trial, or subscription occurred and its price and currency.",
          'Never shared for advertising: HealthKit data of any kind, workouts, exercises, sets, weights, cardio distance, meals, nutrition, body measurements, progress photos, location, or your name, email, or phone number.',
          'You can change your answer anytime in iOS Settings > Privacy & Security > Tracking. Declining costs you nothing — no feature is withheld or degraded, and the app behaves identically either way.',
          "We also use Apple's SKAdNetwork, which reports campaign performance in an aggregated, delayed form that Apple designed so individual users cannot be identified. It works whether or not you allow tracking and does not use the advertising identifier.",
        ],
      },
      {
        heading: 'Subscriptions & Purchases',
        body: [
          'Subscription purchases are handled by the app store you subscribed through, with RevenueCat used to manage entitlements (i.e., which features your account has access to). We never see or store your payment card details — the store handles billing directly.',
        ],
      },
      {
        heading: 'Analytics, Crash Reports & Notifications',
        body: [
          "We use Firebase Analytics to understand feature usage and Firebase Crashlytics to catch and fix crashes — both collect device information and in-app events, not the content of your workouts. Firebase Cloud Messaging delivers push notifications (workout reminders, rest-timer alerts) if you've enabled them; you can turn these off anytime in Settings > Notifications.",
        ],
      },
      {
        heading: 'Third-Party Services We Use',
        body: [
          '• Firebase (Google) — authentication, database, file storage, push notifications, SMS one-time codes, analytics, crash reporting\n• Google Sign-In — optional sign-in method\n• Sign in with Apple — optional sign-in method\n• Anthropic (Claude) — AI coaching responses\n• Amazon Web Services (Bedrock) — hosted Claude, serving the same AI coach\n• Google (Gemini) — meal photo recognition and workout building\n• RevenueCat — subscription/entitlement management\n• Google Ads — install and subscription attribution only (see "Advertising & Attribution")\n• Apple HealthKit — optional workout syncing',
        ],
      },
      {
        heading: 'Data Storage & Security',
        body: [
          'Your data is stored in Firebase (Google Cloud) and transmitted over encrypted connections. Data at rest is protected with industry-standard encryption. Access to your account data is protected by Firebase Authentication and server-side security rules that restrict each account to its own data.',
        ],
      },
      {
        heading: 'Data Retention & Deletion',
        body: [
          'Your data is kept for as long as your account exists. You can permanently delete your account at any time from Settings > Account — this removes your profile, workouts, meals, body measurements, goals, and custom exercises. Personal data is deleted within 30 days of account deletion and removed from backups within 90 days, except where we are required by law to retain it longer.',
        ],
      },
      {
        heading: 'Your Privacy Rights',
        body: [
          'You can view and update your profile in the app, export your data, and permanently delete your account and its data from Settings > Account. You can disable analytics and crash reporting in Settings, and control notifications independently.',
          'If you are in the EU or UK, the GDPR gives you the right to access, rectify, erase, restrict processing of, and port your data, to object to processing, and to withdraw consent. If you are in California, the CCPA gives you the right to know what is collected, to have it deleted, to opt out of sale (we do not sell personal information), and not to be discriminated against for exercising these rights. To exercise any of these, email us at the address below — we aim to respond within 5 business days.',
        ],
      },
      {
        heading: 'International Data Transfers',
        body: [
          'Your data may be processed in countries other than where you live. Firebase operates globally with data centres in multiple regions, and we rely on approved transfer mechanisms so your data is protected regardless of where it is processed.',
        ],
      },
      {
        heading: "What We Don't Do",
        body: [
          '• We do not sell your personal information\n• We do not use your fitness, health, meal, body-measurement, photo, or location data for advertising\n• We do not share your data for marketing by other companies\n• We do not track you across other apps or websites unless you grant permission when asked, and you can withdraw it at any time',
        ],
      },
      {
        heading: "Children's Privacy",
        body: [
          'SolidTrack is not directed at children under 13, and we do not knowingly collect information from them. If we discover we have, we will delete it.',
        ],
      },
      {
        heading: 'Changes to This Policy',
        body: [
          'If this policy changes in a meaningful way, we\'ll update the "Last updated" date above and, for significant changes, notify you in the app.',
        ],
      },
      {
        heading: 'Contact Us',
        body: [
          'Questions about this policy or your data? Email us at davinder@solidevelectrosoft.com. For GDPR-related enquiries, that address also reaches our Data Protection contact.',
        ],
      },
    ],
  },

  terms: {
    slug: 'terms',
    title: 'Terms & Conditions',
    seoTitle: 'SolidTrack Terms & Conditions',
    description:
      'The terms for using the SolidTrack fitness app: accounts, Premium and Elite subscriptions, health and fitness disclaimer, AI-generated content and acceptable use.',
    showUpdated: true,
    intro: [
      'These terms govern your use of SolidTrack, developed by Solid & Electrosoft. You are asked to agree to them when you create an account, and continuing to use the app means you accept them.',
    ],
    sections: [
      {
        heading: 'The Service',
        body: [
          'SolidTrack is a fitness tracking app: workout logging, an exercise library, progress tracking, an AI coach, and an optional Apple Watch companion app. Some features are free; others require a Premium or Elite subscription.',
        ],
      },
      {
        heading: 'Account Registration',
        body: [
          'You can create an account with an email address and password, with a phone number, or through Google or Apple. You must provide accurate information and are responsible for keeping your login credentials secure.',
          'If you register with an email address, we ask you to verify it before you continue. If you register with a phone number, we send a one-time code by SMS to confirm it — standard message rates from your carrier may apply. Entering a valid code for a number that has no account yet creates one.',
          'You must be at least 13 years old, and old enough to consent to use of this app under the laws of your country.',
        ],
      },
      {
        heading: 'Subscriptions & Billing',
        body: [
          "Premium and Elite are auto-renewing subscriptions, billed through whichever app store or payment provider you subscribed through. Payment is charged at confirmation of purchase and renews automatically unless cancelled at least 24 hours before the current period ends. Manage or cancel your subscription from that provider's account settings — on iPhone and iPad, that is your Apple Account settings in the App Store. Refunds are handled by the provider that billed you, under their own policies, rather than by us directly. We never see or store your payment card details.",
        ],
      },
      {
        heading: 'Health & Fitness Disclaimer',
        body: [
          'SolidTrack is not a medical device and does not provide medical advice. Consult a physician before beginning any exercise program, especially if you have a pre-existing health condition. You use workout plans, exercise instructions, and any AI-generated suggestions at your own risk.',
        ],
      },
      {
        heading: 'AI-Generated Content',
        body: [
          'The AI Coach and other AI-generated suggestions (via Anthropic Claude and Google Gemini) are generated automatically and may occasionally be inaccurate or inappropriate for your specific situation. They are not a substitute for professional medical or fitness advice — always use your own judgment.',
        ],
      },
      {
        heading: 'Your Content',
        body: [
          'You own the workout, meal, and profile data you enter into SolidTrack. By using the app you grant us the limited right to store and process that data solely to provide the service to you, as described in our Privacy Policy.',
        ],
      },
      {
        heading: 'Acceptable Use',
        body: [
          "You agree not to misuse the app — including attempting to access another user's data, reverse-engineer the app, or interfere with its normal operation.",
        ],
      },
      {
        heading: 'Intellectual Property',
        body: [
          'The SolidTrack app, its design, and branding are the property of Solid & Electrosoft. The exercise library content is provided for informational use within the app.',
        ],
      },
      {
        heading: 'Termination',
        body: [
          'You may stop using SolidTrack and delete your account at any time from Settings > Account. We may suspend or terminate accounts that violate these terms.',
        ],
      },
      {
        heading: 'Disclaimer & Limitation of Liability',
        body: [
          'SolidTrack is provided "as is" without warranties of any kind. To the fullest extent permitted by law, Solid & Electrosoft is not liable for any injury, loss, or damage arising from your use of the app, including from following a workout plan or AI-generated suggestion.',
        ],
      },
      {
        heading: 'Changes to These Terms',
        body: [
          'We may update these terms from time to time. Continuing to use the app after a change means you accept the updated terms.',
        ],
      },
      {
        heading: 'Contact Us',
        body: [
          'Questions about these terms? Email us at davinder@solidevelectrosoft.com.',
        ],
      },
    ],
  },

  support: {
    slug: 'support',
    title: 'Support',
    seoTitle: 'SolidTrack Support',
    description:
      'Help with the SolidTrack fitness app: contact support, restore purchases, manage or cancel a subscription, and delete your account.',
    showUpdated: false,
    intro: [
      'Need help with SolidTrack? Email davinder@solidevelectrosoft.com, or in the app open the profile menu, choose Help & Feedback, then Contact Support.',
    ],
    // Every answer below is taken from the app code (origin/develop of the app repo); the file is named on each one.
    sections: [
      {
        // lib/features/user/screens/sections/subscription_section.dart ("Restore Purchases", messages),
        // lib/features/user/screens/upgrade_to_pro_screen.dart ("Restore Purchases" button),
        // lib/shared/widgets/profile_menu.dart ("Settings"), settings_screen.dart ("Subscription").
        heading: 'How do I restore my purchases?',
        body: [
          'In the app, open the profile menu, choose Settings, then Subscription, and tap Restore Purchases. You can also tap Restore Purchases on the Upgrade to Pro screen.',
          'In Settings > Subscription, the app tells you "Purchases restored." when it finds your purchase, and "No purchases found to restore." when there is nothing to restore.',
        ],
      },
      {
        // subscription_section.dart ("Manage Subscription", shown only when the plan is Premium or Elite;
        // opens the store's management page), terms_conditions_screen.dart ("Subscriptions & Billing").
        heading: 'How do I cancel my subscription?',
        body: [
          'Premium and Elite subscriptions are managed by the store you subscribed through. On iPhone and iPad, cancel in your Apple Account settings in the App Store.',
          'From the app, open the profile menu, choose Settings, then Subscription, and tap Manage Subscription. This option appears when you have an active Premium or Elite plan, and it opens the store page for managing your subscription.',
        ],
      },
      {
        // lib/features/user/screens/sections/account_section.dart ("Account", "Danger Zone", "Delete Account"),
        // lib/features/user/widgets/account_actions.dart (confirmation text, "Reauthenticate" step).
        heading: 'How do I delete my account?',
        body: [
          'In the app, open the profile menu, choose Settings, then Account, and tap Delete Account under "Danger Zone". Tap Delete Account again in the confirmation to continue. If the app asks you to reauthenticate, choose the option for the way you sign in.',
          'Deleting your account permanently deletes your profile, workouts, meals, body measurements, goals, and custom exercises. This cannot be undone.',
          'The Privacy Policy explains how long data is kept after deletion (see "Data Retention & Deletion").',
        ],
      },
      {
        heading: 'Get SolidTrack',
        body: ['SolidTrack on the App Store: https://apps.apple.com/app/id6751640011'],
      },
    ],
  },
};
