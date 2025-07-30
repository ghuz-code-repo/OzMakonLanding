// Используем Vite import.meta.glob для сканирования изображений
const imageModules = import.meta.glob([
  '/src/assets/img/**/*.jpg',
  '/src/assets/img/**/*.jpeg',
  '/src/assets/img/**/*.png',
  '/src/assets/img/**/*.gif',
  '/src/assets/img/**/*.webp',
  '/src/assets/img/**/*.svg'
], { 
  eager: true,
  as: 'url' // Важное изменение - получаем прямой URL вместо модуля
});

export function getAllImagePaths() {
  try {
    // Преобразуем пути и URL в нужный формат
    const imagePaths = Object.entries(imageModules).map(([path, url]) => ({
      path,
      url // URL уже готов к использованию
    }));
    
    console.log('Found images:', imagePaths.length);
    return imagePaths;
  } catch (error) {
    console.error('Error in getAllImagePaths:', error);
    return [];
  }
}