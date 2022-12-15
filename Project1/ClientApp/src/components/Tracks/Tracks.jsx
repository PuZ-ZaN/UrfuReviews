import React from 'react';
import Track from './Track/Track';

const Tracks = ({ tracks, destiny }) => {
  return (
    <div className={`tracks ${destiny}`}>
      {tracks.map((track) => (
        <Track track={track} />
      ))}
    </div>
  );
};

export default Tracks;
