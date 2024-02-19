import { Section } from '@/components/section';
import { cn } from '@/helpers';
import { seriesData } from '@/modules/home/components/data';
import { Avatar } from 'antd';
import { FaYoutube } from 'react-icons/fa';

type Props = {};

function ChannelBySeriesSection({}: Props) {
  const data = seriesData.slice(0, 3);
  return (
    <Section
      title="View Our Channel"
      titleClassName="xl:text-4xl"
      className={cn('grid grid-cols-1 gap-5', {
        'md:grid-cols-2': data.length === 2,
        'md:grid-cols-2 xl:grid-cols-3': data.length >= 3,
      })}
    >
      {data.map((item) => {
        const { id, title } = item;
        return (
          <a
            key={id}
            className="group/item mx-auto flex max-w-max items-center gap-2"
            href="https://youtube.com/@oggy?sub_confirmation=1"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Avatar
              className="flex-none group-hover/item:opacity-75"
              size={60}
              src="https://yt3.ggpht.com/g3j3iOUOPhNxBCNAArBqiYGzHzCBIzr_Al8mdvtBJeZMGFDblnU5rlVUt6GY01AUwm7Cp70J=s176-c-k-c0x00ffffff-no-rj-mo"
            />
            <div className="">
              <h3 className="mb-1 line-clamp-1 font-medium group-hover/item:text-primary">
                {title}
              </h3>
              <button className="flex max-w-max items-center gap-2 rounded-lg bg-[#fe0000] px-3 py-1 text-white group-hover/item:opacity-75">
                <FaYoutube />
                <span className="text-sm">Youtube</span>
              </button>
            </div>
          </a>
        );
      })}
    </Section>
  );
}

export default ChannelBySeriesSection;
