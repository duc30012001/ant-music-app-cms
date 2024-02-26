const ANT_MUSIC_WEBSITE = 'https://ant-music.net';

export const getOriginalSongURL = (idString: string) =>
  `${ANT_MUSIC_WEBSITE}/songs/${idString}`;
