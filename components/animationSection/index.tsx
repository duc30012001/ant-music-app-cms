import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles
import { PropsWithChildren, useEffect } from 'react';
import { Animation } from './types';

interface Props extends PropsWithChildren {
  animation?: Animation;
}

function AnimationSection({ children, animation = 'fade-up' }: Props) {
  useEffect(() => {
    AOS.init({
      duration: 1250,
      once: true,
      easing: 'ease',
      delay: 100,
    });
  }, []);

  return <div data-aos={animation}>{children}</div>;
}

export default AnimationSection;
