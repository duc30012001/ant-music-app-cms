import { ReactNode } from 'react';

type Props = {
  message: ReactNode;
};

export default function ErrorMessage({ message }: Props) {
  return (message && <p className="mt-1 text-red-600">{message}</p>) || null;
}
