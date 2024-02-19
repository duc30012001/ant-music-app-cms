import AnimationSection from '@/components/animationSection';
import { Container } from '@/components/appContainer';
import { cn } from '@/helpers';
import { statisticalData } from './data';

type Props = {
  className?: string;
};

function Statistical({ className }: Props) {
  return (
    <div className="bg-gradient-to-r from-orange-50 to-rose-100">
      <AnimationSection>
        <Container
          className={cn('rounded-2xl px-5 py-10 lg:py-14 2xl:py-16', className)}
        >
          <div className={cn('grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4')}>
            {statisticalData.map((item, index) => {
              const { id, value, title, icon, color } = item;
              return (
                <div
                  key={id}
                  className={cn(
                    'flex items-center gap-5 !border-l-0 py-4 pl-5 xl:justify-center xl:pl-0',
                    {
                      'xl:!border-l-2': index > 0,
                    }
                  )}
                  style={{
                    borderLeft: index > 0 ? `1px solid ${color}` : undefined,
                  }}
                >
                  <div
                    className="rounded-full p-4 text-3xl text-white"
                    style={{
                      backgroundColor: color,
                    }}
                  >
                    {icon}
                  </div>
                  <div>
                    <p className="text-3xl font-bold" style={{ color }}>
                      {value}
                    </p>
                    <p className="text-xl font-medium">{title}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </AnimationSection>
    </div>
  );
}

export default Statistical;
