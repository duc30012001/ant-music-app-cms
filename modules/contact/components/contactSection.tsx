import Image from 'next/image';

import bg from '@/assets/contact.svg';
import { Container } from '@/components/appContainer';
import { Section } from '@/components/section';
import ContactForm from './contactForm';

type Props = {
  className?: string;
};

function ContactSection({ className }: Props) {
  return (
    <Container>
      <Section
        wrapperClassName={className}
        className="grid grid-cols-1 gap-14 lg:grid-cols-2"
        title="Contact Us"
        description="Have a question for us? Reach out today and a relevant expert will be in touch with you"
      >
        <Image
          src={bg}
          alt="contact"
          className="hidden w-full max-w-md self-center lg:block"
        />
        <ContactForm />
      </Section>
    </Container>
  );
}

export default ContactSection;
