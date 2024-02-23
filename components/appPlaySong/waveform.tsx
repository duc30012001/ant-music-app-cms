import dynamic from 'next/dynamic';

// @ts-ignore
const ReactWaveform = dynamic(() => import('react-audio-waveform'), {
  ssr: false,
});

interface Props {
  peakData: string;
  onClick?: (second: number) => void;
  duration: number | string;
  pos?: number;
  height?: number;
  transitionDuration?: number;
  color?: string;
  progressColor?: string;
}

function Waveform({
  peakData,
  pos = 70,
  onClick,
  duration,
  height = 40,
  transitionDuration = 100,
  color = '#c7c7c9',
  progressColor = 'tomato',
}: Props) {
  const peaks = peakData?.split(';') ?? [];

  if (peaks.length === 0) {
    return null;
  }

  return (
    <div className="w-full overflow-hidden">
      <ReactWaveform
        //   @ts-ignore
        peaks={peaks}
        height={height}
        pos={pos}
        duration={duration}
        onClick={onClick}
        color={color}
        progressColor={progressColor}
        transitionDuration={transitionDuration}
      />
    </div>
  );
}

export default Waveform;
