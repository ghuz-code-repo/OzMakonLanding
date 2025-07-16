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

  // Планировки квартир
  const apartmentImages = [
    '/src/assets/webp/1k-1.webp',
    '/src/assets/webp/1k-2.webp',
    '/src/assets/webp/2k-1.webp',
    '/src/assets/webp/2k-2.webp',
    '/src/assets/webp/3k-1.webp',
    '/src/assets/webp/3k-3.webp',
    '/src/assets/webp/4k-1.webp',
    '/src/assets/webp/4k-2.webp'
  ];

  // Места вокруг
  const placesImages = [
    '/src/assets/webp/dark_gym_interior_with_sport_and_fitness_equipment_2025_03_12_01.webp',
    '/src/assets/webp/electronic_card_key_for_open_door_in_hotel_smart_2025_03_16_08_28.webp',
    '/src/assets/webp/hand_holding_a_silver_fire_alarm_system_sensor_2025_02_11_23_48.webp',
    '/src/assets/webp/clean-agent-fire-suppression-system-2025-02-02-20-12-09-utc.webp',
    '/src/assets/webp/aluminum_window_open_detail_metal_door_frame_clos_2024_12_07_16.webp',
    '/src/assets/webp/a_face_scanner_being_used_by_a_woman_to_open_a_doo_2025_04_01_23.webp',
    '/src/assets/webp/close-up-hand-using-device.webp'
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
