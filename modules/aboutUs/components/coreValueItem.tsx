import AnimationSection from '@/components/animationSection';
import hexRgb from 'hex-rgb';
import Image from 'next/image';
import { useState } from 'react';
import { CoreValue } from './data';

type Props = {
  data: CoreValue;
};

function CoreValueItem({ data }: Props) {
  const [hovered, setHovered] = useState(false);
  const { color, description, image, title } = data;

  const backgroundColor = hexRgb(color, {
    format: 'css',
  });
  const backgroundColorHover = hexRgb(color, {
    format: 'css',
    alpha: 0.2,
  });
  return (
    <AnimationSection>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={`flex cursor-default gap-5 rounded-2xl px-5 py-4 transition-all`}
        style={{
          backgroundColor: hovered ? backgroundColorHover : 'transparent',
        }}
      >
        <div
          className="grid h-14 w-14 flex-none place-content-center rounded-full"
          style={{
            backgroundColor,
          }}
        >
          <Image src={image} alt={title} className="h-8" />
        </div>
        <div>
          <h2 className="text-2xl font-bold" style={{ color }}>
            {title}
          </h2>
          <p className="">{description}</p>
        </div>
      </div>
    </AnimationSection>
  );
}

export default CoreValueItem;
