import document from '@/assets/core-value/document.svg';
import hand from '@/assets/core-value/hand.svg';
import light from '@/assets/core-value/light.svg';

export interface CoreValue {
  id: number;
  title: string;
  color: string;
  image: string;
  description: string;
}

export const coreValueData: CoreValue[] = [
  {
    id: 2,
    title: 'Creative',
    color: '#f99d2f',
    image: light,
    description:
      'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour',
  },
  {
    id: 1,
    title: 'Unite',
    color: '#ff8165',
    image: hand,
    description:
      'If you are going to use a passage of Lorem Ipsum, you need to be sure there isnt anything embarrassing hidden in the middle of text',
  },
  {
    id: 3,
    title: 'Professional',
    color: '#ee7596',
    image: document,
    description:
      'All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet',
  },
];
