import React from 'react';

interface TownMapProps {
  latitude: number;
  longitude: number;
  townName: string;
  className?: string;
}

const TownMap: React.FC<TownMapProps> = ({ latitude, longitude, townName, className = '' }) => {
  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBfOqVQO5LCJMAC3-s9cjlG_XendagIEPU&q=${latitude},${longitude}&zoom=14&maptype=roadmap`;

  return (
    <div className={`rounded-lg overflow-hidden shadow-lg ${className}`}>
      <iframe
        src={mapUrl}
        width="100%"
        height="400"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={`Map of ${townName}, MD`}
        className="w-full h-96"
      />
    </div>
  );
};

export default TownMap;