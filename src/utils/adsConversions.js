/**
 * Google Ads Conversion Tracking
 *
 * Sends conversions to the Solidev Electrosoft Google Ads account
 * (customer 689-157-0625). The AW- tag itself is configured in index.html.
 *
 * Two conversion actions:
 * - lead:    a contact form or AI Project Assistant brief was submitted successfully
 * - contact: a WhatsApp, phone or email link was clicked
 *
 * Labels come from Google Ads > Goals > Conversions > (action) > Tag setup:
 * the part after "AW-18359572635/" in send_to. While a label is empty,
 * that conversion is skipped, so this is safe to ship before the actions exist.
 */

const GOOGLE_ADS_ID = 'AW-18359572635';

const CONVERSION_LABELS = {
  lead: 'DokwCK-t4IgdEJuxw7JE', // "Lead - form / AI brief"
  contact: 'sN7-CLKt4IgdEJuxw7JE', // "Contact - WhatsApp / call / email"
};

/**
 * Report a Google Ads conversion
 *
 * @param {'lead'|'contact'} kind - Which conversion action to report
 */
export const reportAdsConversion = (kind) => {
  const label = CONVERSION_LABELS[kind];
  if (!label || typeof window.gtag !== 'function') return;

  try {
    window.gtag('event', 'conversion', { send_to: `${GOOGLE_ADS_ID}/${label}` });
    if (import.meta.env.DEV) console.log(`Google Ads conversion: ${kind}`);
  } catch (error) {
    console.error('Error reporting Google Ads conversion:', error);
  }
};

// Share links are excluded: FeedShareModal uses api.whatsapp.com/send?text=
// and mailto:?subject= (no recipient) to share a post, not to contact us.
const isContactLink = (href) =>
  href.startsWith('tel:') ||
  /^mailto:[^?]/.test(href) ||
  /^https?:\/\/(wa\.me\/|api\.whatsapp\.com\/send\?phone=)/.test(href);

/**
 * Report a 'contact' conversion for every WhatsApp / phone / email link click
 *
 * One document-level listener instead of per-component handlers, so links
 * added to any page later are covered too. Called once from main.jsx.
 */
export const initContactClickConversions = () => {
  document.addEventListener(
    'click',
    (event) => {
      const link = event.target.closest?.('a[href]');
      if (link && isContactLink(link.getAttribute('href') || '')) {
        reportAdsConversion('contact');
      }
    },
    { capture: true }
  );
};
