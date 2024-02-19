import { ColorPicker as ColorPickerAntd, ColorPickerProps } from 'antd';

const presets = [
  {
    label: 'Recommended',
    colors: [
      '#1bbc9b',
      '#2dcc70',
      '#3598da',
      '#9a59b5',
      '#e91f63',
      '#f1c410',
      '#e67f22',
      '#e84c3d',
      '#95a5a5',
      '#607d8b',
      '#10806a',
      '#1f8b4d',
      '#1f6694',
      '#71368a',
      '#ad1357',
      '#c27c0d',
      '#a84400',
      '#992d22',
      '#979c9f',
      '#546f7a',
      '#13A8A8',
      '#1677FF',
      '#2F54EB',
      '#722ED1',
      '#F5222D',
      '#FADB14',
      '#FA8C16',
      '#EB2F96',
      '#8BBB11',
      '#52C41A',
    ],
  },
];

type Props = {
  // eslint-disable-next-line no-unused-vars
  onChange?: (value: string) => void;
} & ColorPickerProps;

function ColorPicker({ onChange, ...props }: Props) {
  return (
    <ColorPickerAntd
      {...props}
      presets={presets}
      onChange={(value, hex) => onChange?.(hex)}
    />
  );
}

export default ColorPicker;
