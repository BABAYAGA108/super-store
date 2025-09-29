import { useState, useEffect } from "react";

interface BabySlide {
 image:string;
  id: number;
  title: string;
  description: string;
  bgColor: string;
  icon: string;
  duration: number;
}

const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  // Baby picture data - replace with your actual images
  const babySlides: BabySlide[] = [
    {
     image: 
      id: 1,
      title: "Newborn Bliss",
      description: "Capturing the first precious days",
      bgColor: "from-blue-100 to-blue-200",
      icon: "👶",
      duration: 5000, // 5 seconds
    },
    {
      id: 2,
      title: "First Smiles",
      description: "Those unforgettable first smiles",
      bgColor: "from-pink-100 to-pink-200",
      icon: "😊",
      duration: 4000, // 4 seconds
    },
    {
      id: 3,
      title: "Tiny Adventures",
      description: "Exploring the world together",
      bgColor: "from-purple-100 to-purple-200",
      icon: "🌟",
      duration: 4500, // 4.5 seconds
    },
    {
      id: 4,
      title: "Family Love",
      description: "Precious moments with family",
      bgColor: "from-green-100 to-green-200",
      icon: "❤️",
      duration: 5000, // 5 seconds
    },
  ];

  // Auto-advance slides
  useEffect(() => {
    const currentDuration = babySlides[currentSlide]?.duration || 5000;
    const timer = setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % babySlides.length);
    }, currentDuration);

    return () => clearTimeout(timer);
  }, [currentSlide, babySlides]);

  // Manual slide navigation
  const goToSlide = (index: number): void => {
    setCurrentSlide(index);
  };

  const nextSlide = (): void => {
    setCurrentSlide((prev) => (prev + 1) % babySlides.length);
  };

  const prevSlide = (): void => {
    setCurrentSlide(
      (prev) => (prev - 1 + babySlides.length) % babySlides.length
    );
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 via-pink-50 to-purple-50 py-16 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Text Content */}
          <div className="lg:w-1/2 text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-blue-800 mb-4">
              Cherish Every <span className="text-pink-500">Precious</span>{" "}
              Moment
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
              Capture the beautiful journey of your little one's growth. From
              first smiles to first steps, preserve memories that last a
              lifetime.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-6 rounded-full transition duration-300 transform hover:scale-105"
                onClick={() => console.log("View Gallery clicked")}
              >
                View Gallery
              </button>
              <button
                className="border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white font-bold py-3 px-6 rounded-full transition duration-300"
                onClick={() => console.log("Book Session clicked")}
              >
                Book Session
              </button>
            </div>
          </div>

          {/* Carousel Section */}
          <div className="lg:w-1/2 relative">
            <div className="relative h-96 rounded-3xl overflow-hidden shadow-2xl">
              {/* Slides */}
              {babySlides.map((slide, index) => (
                <div
                  key={slide.id}
                  className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                    index === currentSlide
                      ? "opacity-100 transform translate-x-0"
                      : "opacity-0 transform translate-x-full"
                  }`}
                >
                  <div
                    className={`w-full h-full bg-gradient-to-br ${slide.bgColor} flex flex-col items-center justify-center p-8`}
                  >
                    <div className="text-8xl mb-4">{slide.icon}</div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                      {slide.title}
                    </h3>
                    <p className="text-gray-600 text-center">
                      {slide.description}
                    </p>
                  </div>
                </div>
              ))}

              {/* Navigation Arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 w-10 h-10 rounded-full flex items-center justify-center transition duration-300 shadow-lg"
                aria-label="Previous slide"
              >
                ←
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 w-10 h-10 rounded-full flex items-center justify-center transition duration-300 shadow-lg"
                aria-label="Next slide"
              >
                →
              </button>

              {/* Slide Indicators */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {babySlides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-3 h-3 rounded-full transition duration-300 ${
                      index === currentSlide
                        ? "bg-white scale-125"
                        : "bg-white/60 hover:bg-white/80"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

              {/* Progress Bar */}
              <div className="absolute top-4 left-4 right-4 h-1 bg-white/30 rounded">
                <div
                  className="h-full bg-white rounded transition-all duration-300 ease-linear"
                  style={{
                    width: `${((currentSlide + 1) / babySlides.length) * 100}%`,
                  }}
                />
              </div>
            </div>

            {/* Duration Info */}
            <div className="text-center mt-4 text-sm text-gray-600">
              Slide duration: {babySlides[currentSlide]?.duration / 1000}s
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="bg-white rounded-2xl p-6 shadow-lg transform hover:scale-105 transition duration-300">
            <div className="text-3xl font-bold text-pink-500 mb-2">500+</div>
            <div className="text-gray-600">Happy Babies Photographed</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg transform hover:scale-105 transition duration-300">
            <div className="text-3xl font-bold text-blue-500 mb-2">5+</div>
            <div className="text-gray-600">Years of Experience</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg transform hover:scale-105 transition duration-300">
            <div className="text-3xl font-bold text-purple-500 mb-2">100%</div>
            <div className="text-gray-600">Satisfied Parents</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
