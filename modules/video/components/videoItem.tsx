import { Modal } from 'antd';
import { ReactNode, useState } from 'react';
import { FaRegCirclePlay } from 'react-icons/fa6';

type Props = {
  // href: string;
  thumbnail: string;
  title: ReactNode;
  description?: ReactNode;
};

function VideoItem({ thumbnail, title }: Props) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div onClick={() => setOpen(true)} className="cursor-pointer">
        <div className="group/item rounded-2xl">
          <div className="relative aspect-[11/7] w-full overflow-hidden rounded-2xl">
            <div
              className="aspect-[11/7] overflow-hidden bg-cover bg-center bg-no-repeat transition-all duration-300 group-hover/item:scale-110 group-hover/item:blur-sm group-hover/item:brightness-75"
              style={{
                backgroundImage: `url("${thumbnail}")`,
              }}
            />
            <div className="absolute bottom-0 left-0 right-0 top-0 z-10 grid place-content-center text-4xl text-white opacity-0 transition-all duration-300 group-hover/item:opacity-100">
              <FaRegCirclePlay />
            </div>
          </div>
          <h3 className="my-2 line-clamp-2 cursor-pointer font-medium group-hover/item:text-primary">
            {title}
          </h3>
        </div>
      </div>
      <Modal
        title="Oggy and the Cockroaches - NEW JOB (SEASON 4) BEST CARTOON COLLECTION | New Episodes in HD"
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
        width={1000}
        destroyOnClose
      >
        <div className="aspect-video w-full">
          <iframe
            width={'100%'}
            height={'100%'}
            src="https://www.youtube.com/embed/1q-8SzGoKD0?si=aIEH537y1EwGrlS_"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </Modal>
    </>
  );
}

export default VideoItem;
