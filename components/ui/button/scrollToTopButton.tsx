import { useEffect, useState } from 'react';
import { IoMdArrowRoundUp } from 'react-icons/io';

type Props = {};

function ScrollToTopButton({}: Props) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!isVisible) return null;

  return (
    <div
      className="fixed bottom-20 right-5 z-10 cursor-pointer rounded-full bg-primary p-3 text-2xl text-white shadow-lg"
      onClick={scrollToTop}
    >
      <IoMdArrowRoundUp />
    </div>
  );
}

export default ScrollToTopButton;
