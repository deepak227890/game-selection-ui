import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import GameCard from "./GameCard";

// Horizontal 3D carousel with swipe support.
export default function GameCarousel({
  games,
  selectedIndex,
  onSelect,
  previewOnHover,
}) {
  return (
    <div className="w-full">
      <Swiper
        modules={[EffectCoverflow]}
        effect="coverflow"
        grabCursor
        centeredSlides
        slidesPerView="auto"
        spaceBetween={-20}
        speed={650}
        coverflowEffect={{
          rotate: 18,
          stretch: 0,
          depth: 220,
          modifier: 1,
          slideShadows: false,
        }}
        onSlideChange={(swiper) => onSelect(swiper.realIndex)}
        initialSlide={selectedIndex}
        className="game-swiper"
      >
        {games.map((game, i) => (
          <SwiperSlide key={game.id} className="game-slide">
            <GameCard
              game={game}
              isActive={i === selectedIndex}
              onSelect={() => onSelect(i, true)}
              previewOnHover={previewOnHover}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
