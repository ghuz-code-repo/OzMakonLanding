// Утилита для автоматического создания конфигурации медиафайлов
// Эта функция поможет собрать все изображения из проекта

export const generateMediaConfig = () => {
  // Hero изображения
  const heroImages = [
    '/src/assets/img/Hero/background.webp',
    '/src/assets/img/Hero/logo.svg'
  ];

  // Conception изображения
  const conceptionImages = [
    '/src/assets/img/Conception/main-image.webp',
    '/src/assets/img/Conception/rectangle-37.png',
    '/src/assets/img/Conception/icon-1.svg',
    '/src/assets/img/Conception/icon-2.svg',
    '/src/assets/img/Conception/icon-3.svg',
    '/src/assets/img/Conception/telegram-cloud-document.webp'
  ];

  // Карусель изображения по слайдам
  const carouselImages = {
    slide1: [
      '/src/assets/img/UniqueSellingPropositionsGrid5/slide1/sports.webp',
      '/src/assets/img/UniqueSellingPropositionsGrid5/slide1/kids_room.webp',
      '/src/assets/img/UniqueSellingPropositionsGrid5/slide1/eagle_view.webp',
      '/src/assets/img/UniqueSellingPropositionsGrid5/slide1/front_view.webp',
      '/src/assets/img/UniqueSellingPropositionsGrid5/slide1/bbq.webp'
    ],
    slide2: [
      '/src/assets/img/UniqueSellingPropositionsGrid5/slide2/coffe_table.webp',
      '/src/assets/img/UniqueSellingPropositionsGrid5/slide2/enter.webp',
      '/src/assets/img/UniqueSellingPropositionsGrid5/slide2/hall.webp',
      '/src/assets/img/UniqueSellingPropositionsGrid5/slide2/komnata.webp',
      '/src/assets/img/UniqueSellingPropositionsGrid5/slide2/lift.webp'
    ],
    slide3: [
      '/src/assets/img/UniqueSellingPropositionsGrid5/slide3/2b-garage.webp',
      '/src/assets/img/UniqueSellingPropositionsGrid5/slide3/electro_zaryad.webp',
      '/src/assets/img/UniqueSellingPropositionsGrid5/slide3/parking_big.webp',
      '/src/assets/img/UniqueSellingPropositionsGrid5/slide3/usiliteli.webp'
    ],
    slide4: [
      '/src/assets/img/UniqueSellingPropositionsGrid5/slide4/camera.webp',
      '/src/assets/img/UniqueSellingPropositionsGrid5/slide4/phone_lok.webp',
      '/src/assets/img/UniqueSellingPropositionsGrid5/slide4/pojar.webp',
      '/src/assets/img/UniqueSellingPropositionsGrid5/slide4/solar_pannel.webp'
    ],
    slide5: [
      '/src/assets/img/UniqueSellingPropositionsGrid5/slide5/bicycle.webp',
      '/src/assets/img/UniqueSellingPropositionsGrid5/slide5/boiler.webp',
      '/src/assets/img/UniqueSellingPropositionsGrid5/slide5/electro_lock.webp',
      '/src/assets/img/UniqueSellingPropositionsGrid5/slide5/window.webp'
    ]
  };

  // Планировки квартир - ВСЕ файлы из ApartmentLayouts
  const apartmentImages = [
    '/src/assets/img/ApartmentLayouts/1k-1.webp',
    '/src/assets/img/ApartmentLayouts/1k-2.webp',
    '/src/assets/img/ApartmentLayouts/2k-1.webp',
    '/src/assets/img/ApartmentLayouts/2k-2.webp',
    '/src/assets/img/ApartmentLayouts/3k-1.webp',
    '/src/assets/img/ApartmentLayouts/3k-2.webp',
    '/src/assets/img/ApartmentLayouts/4k-1.webp',
    '/src/assets/img/ApartmentLayouts/4k-2.webp',
    '/src/assets/img/ApartmentLayouts/all.png'
  ];

  // Места вокруг - ВСЕ файлы из всех подпапок PlacesAround
  const placesImages = [
    // Shopping Centers
    '/src/assets/img/PlacesAround/ShoppingCenters/ТРЦ 2.webp',
    '/src/assets/img/PlacesAround/ShoppingCenters/ТРЦ 3.webp',
    '/src/assets/img/PlacesAround/ShoppingCenters/ТРЦ 4.webp',
    
    // Markets
    '/src/assets/img/PlacesAround/Markets/fruits.webp',
    '/src/assets/img/PlacesAround/Markets/man.webp',
    '/src/assets/img/PlacesAround/Markets/nuts.webp',
    
    // Parks
    '/src/assets/img/PlacesAround/Parks/pink.png',
    '/src/assets/img/PlacesAround/Parks/Парки 1.webp',
    '/src/assets/img/PlacesAround/Parks/парки 2.webp',
    
    // Schools
    '/src/assets/img/PlacesAround/Schools/школы 1.webp',
    '/src/assets/img/PlacesAround/Schools/школы 3.webp',
    '/src/assets/img/PlacesAround/Schools/школы 4.webp',
    
    // Entertainment
    '/src/assets/img/PlacesAround/Entertainment/досуг 2.webp',
    '/src/assets/img/PlacesAround/Entertainment/досуг 3.webp',
    '/src/assets/img/PlacesAround/Entertainment/досуг 4.webp',
    
    // Car icon
    '/src/assets/img/PlacesAround/car.svg'
  ];

  // Локация
  const locationImages = [
    '/src/assets/webp/Golden House OZMakon_Res_View 1 ОЧЕРЕДь.webp',
    '/src/assets/webp/bG4Nj8sylI9MApxIBUFS-rail.webp',
    '/src/assets/webp/d1d443d7d05fa88d7af53e897e3fc70d_lf.webp',
    '/src/assets/webp/ChatGPT Image 18 июн. 2025 г., 16_17_30.webp'
  ];

  return {
    // Критические изображения для первоначальной загрузки
    critical: {
      priority: true,
      urls: [
        ...heroImages,
        ...conceptionImages,
        // Только первые 2 изображения из первого слайда карусели
        carouselImages.slide1[0],
        carouselImages.slide1[1]
      ]
    },

    // Остальные изображения карусели
    carousel: {
      priority: false,
      urls: [
        // Остальные изображения первого слайда
        ...carouselImages.slide1.slice(2),
        // Все изображения остальных слайдов
        ...carouselImages.slide2,
        ...carouselImages.slide3,
        ...carouselImages.slide4,
        ...carouselImages.slide5
      ]
    },

    // Планировки квартир
    apartments: {
      priority: false,
      urls: apartmentImages
    },

    // Места вокруг
    places: {
      priority: false,
      urls: placesImages
    },

    // Локация
    location: {
      priority: false,
      urls: locationImages
    }
  };
};

export default generateMediaConfig;
