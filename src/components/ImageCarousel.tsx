import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { getPexelsResponsiveImages } from '../utils/imageUtils';

interface ImageCarouselProps {
  images: Array<{
    src: string;
    pexelsId?: string;
    alt: string;
    title?: string;
    description?: string;
  }>;
  className?: string;
  autoplay?: boolean;
  effect?: 'slide' | 'fade';
  slidesPerView?: number;
  spaceBetween?: number;
  imageFit?: 'cover' | 'contain' | 'fit';
  aspectRatio?: string;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({
  images,
  className = '',
  autoplay = true,
  effect = 'slide',
  slidesPerView = 1,
  spaceBetween = 30,
  imageFit = 'cover',
  aspectRatio = 'aspect-video'
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className={`relative ${className}`}>
      <div className="overflow-hidden rounded-lg">
        <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectFade]}
          spaceBetween={spaceBetween}
          slidesPerView={slidesPerView}
          navigation={{
            enabled: true,
            hideOnClick: false,
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          autoplay={autoplay ? {
            delay: 4000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          } : false}
          effect={effect}
          loop={true}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          breakpoints={{
            640: {
              slidesPerView: Math.min(slidesPerView, 1),
              spaceBetween: 20,
            },
            768: {
              slidesPerView: Math.min(slidesPerView, 2),
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: slidesPerView,
              spaceBetween: spaceBetween,
            },
          }}
          className="rounded-lg overflow-hidden shadow-glow w-full min-h-[250px] md:min-h-[400px]"
        >
          {images.map((image, index) => (
            <SwiperSlide key={index} className="w-full">
              <div className="relative group w-full h-full overflow-hidden">
                <div className={`relative w-full h-auto ${aspectRatio} overflow-hidden rounded-lg bg-navy/20`}>
                  {image.pexelsId ? (
                    <picture>
                      <source 
                        media="(max-width: 640px)"
                        srcSet={getPexelsResponsiveImages(image.pexelsId).small}
                      />
                      <source 
                        media="(max-width: 1024px)"
                        srcSet={getPexelsResponsiveImages(image.pexelsId).medium}
                      />
                      <img
                        src={getPexelsResponsiveImages(image.pexelsId).large}
                        alt={image.alt}
                        className={`w-full h-full ${
                          imageFit === 'contain' 
                            ? 'object-contain' 
                            : imageFit === 'fit'
                            ? 'object-scale-down'
                            : 'object-cover'
                        } transition-transform duration-500 group-hover:scale-105`}
                        fetchPriority="high"
                        loading="lazy"
                      />
                    </picture>
                  ) : image.src.startsWith('/') ? (
                    <picture>
                     {/* Mobile-specific source - forces small images on mobile */}
                     <source 
                       media="(max-width: 640px)"
                       srcSet={`${image.src}_small.webp`}
                       type="image/webp"
                     />
                     {/* Desktop and tablet source */}
                      <source 
                       media="(min-width: 641px)"
                        srcSet={`${image.src}_small.webp 480w, ${image.src}_medium.webp 800w, ${image.src}_large.webp 1200w`}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 800px, 1200px"
                        type="image/webp"
                      />
                      <img
                        src={`${image.src}_large.webp`}
                        alt={image.alt}
                        className={`w-full h-full ${
                          imageFit === 'contain' 
                            ? 'object-contain' 
                            : imageFit === 'fit'
                            ? 'object-scale-down'
                            : 'object-cover'
                        } transition-transform duration-500 group-hover:scale-105`}
                        fetchPriority="high"
                        loading="lazy"
                      />
                    </picture>
                  ) : (
                    <img
                      src={image.src}
                      alt={image.alt}
                      className={`w-full h-full ${
                        imageFit === 'contain' 
                          ? 'object-contain' 
                          : imageFit === 'fit'
                          ? 'object-scale-down'
                          : 'object-cover'
                      } transition-transform duration-500 group-hover:scale-105`}
                      fetchPriority="high"
                      loading="lazy"
                    />
                  )}
                </div>
                
                {/* Desktop overlay text */}
                {(image.title || image.description) && (
                  <div className="hidden md:block absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg z-40">
                    <div className="absolute bottom-4 left-4 right-4 text-white z-50">
                      {image.title && (
                        <h3 className="text-lg font-semibold mb-2 text-mint">
                          {image.title}
                        </h3>
                      )}
                      {image.description && (
                        <p className="text-sm text-peach/90 leading-relaxed">
                          {image.description}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      
      {/* Mobile text below carousel - synced with active slide */}
      {images[activeIndex] && (images[activeIndex].title || images[activeIndex].description) && (
        <div className="md:hidden mt-4 px-4 text-center">
          {images[activeIndex].title && (
            <h3 className="text-lg font-semibold mb-2 text-mint">
              {images[activeIndex].title}
            </h3>
          )}
          {images[activeIndex].description && (
            <p className="text-sm text-peach/90 leading-relaxed">
              {images[activeIndex].description}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageCarousel;