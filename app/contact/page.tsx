import type { Metadata } from 'next';
import { Mailbox } from '../../components/art/signs';
import { Contact } from '../../components/contact-sections';
import { PageHead } from '../../components/page-head';
import { business } from '../../content/business';
import { absoluteUrl } from '../../lib/paths';

export const metadata: Metadata = {
  title: 'Ask about a walk',
  description: 'Ask Happy Trails Dog Walkers about walks, a free meet & greet or pet-sitting dates on Madison’s east side.',
  alternates: { canonical: absoluteUrl('/contact/') },
};

// Contact copy. The intro and the message checklist live in content/business.ts (enquiries).
export default function ContactPage() {
  return (
    <>
      <PageHead title={business.enquiries.title} art={<Mailbox className="w-full" />} note="Free meet & greet">
        <p>{business.enquiries.introduction}</p>
      </PageHead>
      <Contact>
        <Contact.Mailbox>Trail mailbox</Contact.Mailbox>
        <div className="grid gap-14">
          <Contact.Enquiry>Send an enquiry</Contact.Enquiry>
          <Contact.Checklist>Useful to include in your message</Contact.Checklist>
        </div>
      </Contact>
    </>
  );
}
