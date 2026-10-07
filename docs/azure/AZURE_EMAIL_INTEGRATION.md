# Email from the website

## Overview

The website sends two kinds of email, through two different paths. Neither path puts an email key in this
repository, in the browser build, in a workflow or in a `.env` file.

| What | Sent by | How |
|---|---|---|
| Form submissions: Contact page, FAQ form, floating "call me back" form | The Solidev email API (an Azure Function kept in a separate, private repository) | The browser posts `{ useCase, fields, sendConfirmation }` to the API URL in `src/config/environment.js`. The API owns the recipients, the templates, the rate limits and the origin allow-list, and sends the submitter a confirmation. |
| The AI Project Requirements Assistant's final summary, with a PDF attached | The Firebase Function `sendRequirements` (`functions/email/sendRequirements.js`) | The function sends with Azure Communication Services from the server. Its connection string lives only in the Functions runtime configuration (see below). |

```
Browser form  ──POST { useCase, fields }──▶  Solidev email API  ──▶  Azure Communication Services
AI assistant  ──POST summary + history──▶  Firebase Function   ──▶  Azure Communication Services
```

## Form submissions (email API)

- Client: `src/services/emailService.js`. Use cases: `website-contact` (Contact page, FAQ form; the readable
  project-type and budget labels are sent as `projectType` and `budget`) and `website-callback` (the floating form,
  phone number only, no confirmation).
- The client never sends a recipient, a subject, HTML or a key. A refused or failed call returns `{ success: false }`
  and the form shows its "could not send" message; it never throws.
- The API URL is the only email-related setting in this repository. If the API is ever hosted elsewhere, change it in
  `src/config/environment.js`.

## AI assistant requirements email (Firebase Function)

The function reads the Azure Communication Services connection string from the Functions runtime configuration key
`azure.email.connection_string`. Set it once from a machine with Firebase CLI access, then deploy the functions:

```bash
firebase functions:config:set azure.email.connection_string="<connection string from the Azure portal>"
firebase deploy --only functions
```

Rotating the key: regenerate it in the Azure portal, run the two commands above with the new value, and check one
assistant submission afterwards. Nothing else in this repository uses the key.

Firebase is retiring `functions.config()` in favour of parameterized configuration and secrets (`defineSecret`); plan
that move together with the next change to this function.

## Testing

- Forms, locally: `npm run dev`, submit a form with test data, and confirm in DevTools → Network one `POST` to the API
  URL per submission. From `localhost` the API refuses the origin, so the form shows its "could not send" message;
  that is expected.
- Requirements email: call the deployed function with test data only (it emails the inbox configured in the function):

```bash
curl -X POST "<functions base URL>/sendRequirements" \
  -H "Content-Type: application/json" \
  -d '{"requirementsSummary":"Test requirements","conversationHistory":[{"role":"user","content":"Test"}],"userEmail":"test@example.com"}'
```

## Troubleshooting

- `Azure Communication Services configuration missing` in the function logs: the runtime configuration key above is
  not set for the deployed project.
- A form shows "could not send" on the live site: check the email API's own logs (origin allow-list, rate limit,
  validation) in its repository; the website only reports success or failure.
- `firebase functions:log` shows the function's output; the email API has its own Application Insights.
