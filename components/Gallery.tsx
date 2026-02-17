import React, { useState } from 'react';

const galleryImages = [
  { src: 'assets/gengar_hero_1771317599607.jpg', title: '暗影耿鬼', desc: 'Shadow Gengar' },
  { src: 'assets/gengar_hero_1771317623741.jpg', title: '幽灵之夜', desc: 'Ghost Night' },
  { src: 'assets/gengar_hero_section_1771317647850.jpg', title: '紫影降临', desc: 'Purple Shadow' },
];

const Gallery: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-16 px-6 md:px-20 relative">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
            主题画廊 <span className="text-gray-500 font-light">Gallery</span>
          </h3>
          <p className="text-gray-400 text-sm">探索耿鬼主题的视觉魅力</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer group"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <img
                src={image.src}
                alt={image.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent transition-opacity duration-300 ${
                hoveredIndex === index ? 'opacity-100' : 'opacity-0'
              }`}>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-white font-bold text-lg">{image.title}</p>
                  <p className="text-gengar-accent text-sm">{image.desc}</p>
                </div>
              </div>
              <div className={`absolute inset-0 border-2 border-gengar-accent/50 rounded-2xl transition-opacity duration-300 ${
                hoveredIndex === index ? 'opacity-100' : 'opacity-0'
              }`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
