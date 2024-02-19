import creative from '@/assets/core-value/creative.svg';
import professional from '@/assets/core-value/professional.svg';
import shake from '@/assets/core-value/shake-hand.svg';
import sign from '@/assets/core-value/sign.svg';
import sign1 from '@/assets/core-value/sign1.svg';
import unite from '@/assets/core-value/unite.svg';

export interface IHistory {
  id: number;
  title: string;
  color: string;
  content: string;
  image: string;
}

export const history: IHistory[] = [
  {
    id: 1,
    title: '2014',
    color: '#feb800',
    image: creative,
    content:
      'The first team with nearly 20 members were formed. After a few years, there were 5 members left that continued pursueing the visions.',
  },
  {
    id: 2,
    title: '2017',
    color: '#f57f4d',
    image: unite,
    content:
      'Despite the location, the current Chairman and General Director, cooperated to rebuild the team with people having the same dream.',
  },
  {
    id: 3,
    title: '2018',
    color: '#0090c4',
    image: shake,
    content:
      'The team had 30 members coming from different places around Vietnam. They worked together, and the company was formed.',
  },
  {
    id: 4,
    title: '2020',
    color: '#2abec0',
    image: sign1,
    content:
      '“ANT Media” was chosen to be the name of the company, meaning the team with strong connection and sustainable development.',
  },
  {
    id: 5,
    title: '2021',
    color: '#ee7596',
    image: professional,
    content:
      'This is the turning point when the total members of the company reached more than 200 in both the headquater in Hanoi and Vinh branch.',
  },
  {
    id: 6,
    title: '2022',
    color: '#7136b0',
    image: sign,
    content:
      'Officially renamed as ANT Group - Aimed to become a Technology, Media and Entertainment Group - a multinational company bringing music, entertainment, technology, and education products to millions of audiences worldwide.',
  },
];
