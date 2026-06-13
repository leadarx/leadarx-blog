import { format, formatDistanceToNow, parseISO, isAfter, subDays } from 'date-fns';

export function formatDate(iso: string): string {
  return format(parseISO(iso), 'MMMM d, yyyy');
}

export function formatDateShort(iso: string): string {
  return format(parseISO(iso), 'MMM d, yyyy');
}

export function formatDateFull(iso: string): string {
  return format(parseISO(iso), 'EEEE, do MMMM yyyy');
}

export function formatDateRelative(iso: string): string {
  const date = parseISO(iso);
  if (isAfter(date, subDays(new Date(), 30))) {
    return formatDistanceToNow(date, { addSuffix: true });
  }
  return formatDate(iso);
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length).trimEnd() + '...';
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

export function extractHeadings(html: string): { id: string; text: string; level: number }[] {
  const headings: { id: string; text: string; level: number }[] = [];
  const regex = /<h([23])[^>]*id="([^"]+)"[^>]*>(.*?)<\/h[23]>/gi;
  let match;
  while ((match = regex.exec(html)) !== null) {
    headings.push({
      level: parseInt(match[1]),
      id: match[2],
      text: match[3].replace(/<[^>]+>/g, ''),
    });
  }
  return headings;
}

export function addHeadingIds(html: string): string {
  return html.replace(/<h([23])([^>]*)>(.*?)<\/h[23]>/gi, (_, level, attrs, text) => {
    const plainText = text.replace(/<[^>]+>/g, '');
    const id = slugify(plainText);
    if (attrs.includes('id=')) return `<h${level}${attrs}>${text}</h${level}>`;
    return `<h${level}${attrs} id="${id}">${text}</h${level}>`;
  });
}

export function injectEnrollmentCta(html: string, categoryColor?: string): string {
  const bg = categoryColor || '#D96C4A';
  const mainUrl = process.env.NEXT_PUBLIC_MAIN_SITE_URL ?? 'https://leadarx.com';
  const cta = `
<div class="enrollment-cta-inline" style="background:${bg};border-radius:12px;padding:28px 32px;margin:40px 0;text-align:center;">
  <p style="color:#1C1C1C;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;margin-bottom:10px;">Ready to go further?</p>
  <h3 style="color:#1C1C1C;font-size:22px;font-weight:700;margin-bottom:12px;line-height:1.3;">Master these skills in 10 weeks</h3>
  <p style="color:rgba(28,28,28,0.8);margin-bottom:20px;font-size:15px;">Our certified Data Analysis program covers everything in this article and more. Live instructors. Real projects. Job support.</p>
  <a href="${mainUrl}" style="display:inline-block;background:#ffffff;color:#1C1C1C;padding:12px 28px;border-radius:8px;font-weight:600;font-size:15px;text-decoration:none;">Enroll Now</a>
</div>`;

  const paragraphs = html.split('</p>');
  if (paragraphs.length < 4) return html;
  const insertAt = Math.floor(paragraphs.length * 0.55);
  paragraphs.splice(insertAt, 0, cta);
  return paragraphs.join('</p>');
}
