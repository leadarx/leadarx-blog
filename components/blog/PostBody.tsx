import { addHeadingIds, injectEnrollmentCta } from '@/lib/utils';

interface Props {
  html: string;
  categoryColor?: string;
}

export default function PostBody({ html, categoryColor }: Props) {
  const withIds  = addHeadingIds(html);
  const withCtas = injectEnrollmentCta(withIds, categoryColor);

  return (
    <div
      className="post-body prose prose-brand max-w-none text-[17px] leading-[1.75]"
      dangerouslySetInnerHTML={{ __html: withCtas }}
    />
  );
}
