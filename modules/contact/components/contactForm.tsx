import { Button } from '@/components/ui/button';
import { InputField, TextAreaField } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type Props = {};

const contactFormSchema = z.object({
  subject: z.string().min(2).max(100),
  name: z.string().min(2).max(100),
  email: z.string().email(),
  message: z.string().min(2).max(2000),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function ContactForm({}: Props) {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    mode: 'onChange',
  });

  const { control } = form;

  function onSubmit(values: ContactFormValues) {
    console.log('values:', values);
  }

  return (
    <div>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <InputField name="subject" control={control} label="Subject" required />
        <InputField name="name" control={control} label="Name" required />
        <InputField name="email" control={control} label="Email" required />
        <TextAreaField
          name="message"
          control={control}
          label="Message"
          required
          rows={4}
        />
        <Button primary type="submit" className="mt-4 w-full max-w-none">
          Send
        </Button>
      </form>
    </div>
  );
}
