/**
 * Very small Markdown -> HTML renderer for admin-entered content
 * Supports headings (#), bold (**), italics (*), links [text](url), lists (- ) and paragraphs
 * This is intentionally minimal to avoid adding heavy deps; admin-authored content is trusted.
 */
export function renderMarkdown(md = '') {
  if (!md) return '';

  // Escape HTML special chars
  const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const lines = md.split(/\r?\n/);
  let html = '';
  let inList = false;

  const parseInline = (text) => {
    // links
    text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
    // bold
    text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    // italics
    text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');
    return text;
  };

  for (let rawLine of lines) {
    const line = rawLine.trim();
    if (!line) {
      if (inList) {
        html += '</ul>';
        inList = false;
      }
      continue;
    }

    // Headings
    const hMatch = line.match(/^(#{1,6})\s+(.*)$/);
    if (hMatch) {
      if (inList) { html += '</ul>'; inList = false; }
      const level = hMatch[1].length;
      html += `<h${level}>${parseInline(esc(hMatch[2]))}</h${level}>`;
      continue;
    }

    // List
    if (line.startsWith('- ')) {
      if (!inList) { html += '<ul>'; inList = true; }
      html += `<li>${parseInline(esc(line.replace(/^\-\s+/, '')))}</li>`;
      continue;
    }

    // Paragraph
    html += `<p>${parseInline(esc(line))}</p>`;
  }

  if (inList) html += '</ul>';
  return html;
}
