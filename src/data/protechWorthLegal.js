// Protech Worth (formerly Protech Wallet): privacy, terms and support text (SE-4182).
// Written from the app's real data list (Firestore collections, sign-up notice v2026-11-04).
// The app links here: /apps/protech-worth/{privacy,terms,support}. Keep the in-app
// notice (lib/features/auth/widgets/consent_notice.dart) and this text in step.

export const PROTECH_WORTH = {
  name: 'Protech Worth',
  formerly: 'Protech Wallet',
  company: 'Solidev Electrosoft Private Limited',
  email: 'admin@solidevelectrosoft.com',
  updated: '4 November 2026',
};

// Each page: title, intro, sections [{ heading, paragraphs?, bullets? }].
export const LEGAL_PAGES = {
  privacy: {
    slug: 'privacy',
    title: 'Privacy Policy',
    seoTitle: 'Protech Worth Privacy Policy',
    description:
      'What the Protech Worth net-worth app stores, where it is kept, what is optional (bank SMS, notifications, AI reading), and how to delete your account and data.',
    intro: [
      'Protech Worth is a personal net-worth tracker made by Solidev Electrosoft Private Limited ("we"). This policy explains, in plain language, what the app stores, why, and how you can delete it. It applies to the Protech Worth app for Android and iOS (formerly called Protech Wallet).',
    ],
    sections: [
      {
        heading: 'Summary',
        bullets: [
          'We store your email and the money records you enter, so the app can show your balances and net worth.',
          'Your records are stored on Google Firebase under your account. Only you can read them.',
          'Reading bank SMS, app notifications and AI reading of screenshots are optional and off until you turn them on.',
          'No ads. We never sell your data or share it for advertising.',
          'You can delete your account and all your data from inside the app at any time.',
        ],
      },
      {
        heading: 'What we store',
        bullets: [
          'Account details: your email address and sign-in. Passwords are handled by Google Firebase Authentication; we never see them.',
          'Your records: the accounts you add (name, type, balance), transactions (amount, date, type, category, note), and people you track money lent to or borrowed from (the name you give them and the amounts).',
          'Imports: when you import a bank statement file (CSV or Excel), the file is read on your phone. The rows found are saved so you can review them, and your column-mapping choices are saved as a template. The file itself is not uploaded.',
          'Agreement record: the version of the sign-up notice you accepted and when.',
        ],
      },
      {
        heading: 'Optional features (off until you turn them on)',
        paragraphs: [
          'Some features need extra permission. Each one asks you separately before it starts, and you can turn it off at any time in the app or in your phone settings.',
        ],
        bullets: [
          'Bank SMS and app notifications (Android): the app reads bank SMS and notifications from banking and investment apps on your phone to suggest entries. The message is read on your phone. Only the amount, date, account name and merchant are saved. One-time passwords (OTPs), full account or card numbers, and the full message text are never saved or sent. Suggested entries wait in a review list until you accept them, unless you choose to trust a rule.',
          'AI reading of screenshots and statements: if you choose to share a screenshot or statement for reading, it is sent to a cloud AI service only to read the amounts and dates in it. We will name the AI provider on this page before this feature is released.',
          'Prices: to value mutual funds or gold, the app downloads public prices (for example AMFI NAVs). This sends no personal data.',
        ],
      },
      {
        heading: 'Why we use it',
        bullets: [
          'To run the app: show your accounts, balances, history and net worth, and keep them in sync across your devices.',
          'To keep your account secure and to answer you when you contact support.',
          'We do not use your data for advertising, and we do not sell it.',
        ],
      },
      {
        heading: 'Where it is stored and who processes it',
        paragraphs: [
          'Your data is stored with Google Firebase (Firebase Authentication and Cloud Firestore), which acts as our service provider. Google may process it on servers outside India. Our database rules let a signed-in user read and change only their own records.',
          'We do not share your data with anyone else, except where the law requires it.',
        ],
      },
      {
        heading: 'How long we keep it, and deleting it',
        paragraphs: [
          'We keep your data while you have an account. To delete everything, open the app and go to Settings › Delete account, then confirm your password. This deletes your accounts, transactions, people, pending imports, import templates, profile and sign-in from our database straight away. It cannot be undone.',
          `If you cannot sign in, email us from the address you signed up with and ask us to delete your account. We will confirm when it is done.`,
        ],
      },
      {
        heading: 'Your rights',
        paragraphs: [
          'You can see and correct your data in the app, withdraw consent for an optional feature by turning it off, and delete your account. Under India\'s Digital Personal Data Protection Act, 2023 you may also ask us about how your data is processed and raise a complaint with us. If we do not resolve it, you may complain to the Data Protection Board of India.',
        ],
      },
      {
        heading: 'Security',
        paragraphs: [
          'Data is sent over encrypted connections and stored by Google Firebase. Access is limited by your sign-in and our database rules. No system is perfectly secure; please use a strong password that you do not use elsewhere.',
        ],
      },
      {
        heading: 'Children',
        paragraphs: ['Protech Worth is meant for adults (18 and over). We do not knowingly collect data from children.'],
      },
      {
        heading: 'Changes to this policy',
        paragraphs: [
          'If we change what we collect or how we use it, we will update this page and the date below. For important changes, the app will ask you to agree again.',
        ],
      },
      {
        heading: 'Contact and grievance officer',
        paragraphs: [
          'Grievance Officer, Solidev Electrosoft Private Limited. Email: admin@solidevelectrosoft.com. We aim to reply within 2 working days.',
        ],
      },
    ],
  },

  terms: {
    slug: 'terms',
    title: 'Terms of Use',
    seoTitle: 'Protech Worth Terms of Use',
    description: 'The terms for using the Protech Worth personal net-worth tracking app.',
    intro: [
      'These terms apply when you use the Protech Worth app (formerly Protech Wallet), made by Solidev Electrosoft Private Limited ("we"). By creating an account you agree to them and to our Privacy Policy.',
    ],
    sections: [
      {
        heading: 'What the app is',
        paragraphs: [
          'Protech Worth is a personal tool for recording your accounts, transactions and net worth. It is not a bank, a payment service, or a financial, tax or investment adviser, and nothing in it is financial advice.',
        ],
      },
      {
        heading: 'Your account',
        bullets: [
          'You must be 18 or older and give a real email address.',
          'Keep your password safe. You are responsible for what happens under your account.',
          'Use the app only for your own records and only within the law.',
        ],
      },
      {
        heading: 'Your data',
        paragraphs: [
          'Your records belong to you. You give us permission to store and process them only to run the app for you, as described in the Privacy Policy. You can delete your account and data at any time from Settings › Delete account.',
        ],
      },
      {
        heading: 'Accuracy',
        paragraphs: [
          'Balances and net worth are calculated from what you enter, import or accept, and from public prices that may be delayed. Suggestions read from SMS, notifications, statements or screenshots can be wrong; check them before you accept them. Do not rely on the app as your only record for tax, legal or banking purposes.',
        ],
      },
      {
        heading: 'Availability and changes',
        paragraphs: [
          'We work to keep the app running but cannot promise it will always be available or error-free. We may change, add or remove features. If we stop offering the app, we will give notice in the app where we can.',
        ],
      },
      {
        heading: 'Limits of our responsibility',
        paragraphs: [
          'The app is provided "as is". To the extent the law allows, we are not liable for indirect losses, or for decisions you make based on figures shown in the app. Nothing in these terms limits rights you have under consumer law that cannot be limited.',
        ],
      },
      {
        heading: 'Ending use',
        paragraphs: [
          'You can stop using the app and delete your account at any time. We may suspend an account that is used to break the law or to attack the service.',
        ],
      },
      {
        heading: 'Law',
        paragraphs: ['These terms are governed by the laws of India, and disputes go to the courts of India.'],
      },
      {
        heading: 'Contact',
        paragraphs: ['Questions about these terms: admin@solidevelectrosoft.com.'],
      },
    ],
  },

  support: {
    slug: 'support',
    title: 'Support',
    seoTitle: 'Protech Worth Support',
    description: 'Help with the Protech Worth app: contact, password reset, and how to delete your account and data.',
    intro: [
      'Need help with Protech Worth (formerly Protech Wallet)? Email admin@solidevelectrosoft.com with your question and, if you can, a screenshot. Please never send your password or one-time passwords (OTPs). We aim to reply within 2 working days.',
    ],
    sections: [
      {
        heading: 'I forgot my password',
        paragraphs: [
          'On the sign-in screen tap "Forgot password?", enter your email, and open the reset link we send. Check your spam folder if it does not arrive within a few minutes.',
        ],
      },
      {
        heading: 'Delete your account and data',
        paragraphs: [
          'In the app: Settings › Delete account, confirm your password, then tap "Delete forever". Your accounts, transactions, people, pending imports, import templates, profile and sign-in are deleted straight away. This cannot be undone.',
          'If you cannot sign in: email admin@solidevelectrosoft.com from the address you signed up with and ask us to delete your account. We will confirm by email when it is done.',
        ],
      },
      {
        heading: 'Turning off SMS or notification reading',
        paragraphs: [
          'Turn the feature off in the app, or remove the permission in your phone settings (Settings › Apps › Protech Worth › Permissions, or Notification access). Entries already saved stay until you delete them.',
        ],
      },
      {
        heading: 'A balance looks wrong',
        paragraphs: [
          'Open the account, check its recent transactions, and edit or delete the wrong one; the balance is recalculated. If it still looks wrong, email us with the account type and what you expected to see (no account numbers needed).',
        ],
      },
    ],
  },
};
