import React, { useEffect, useState } from 'react';
import { useMediaPreloader } from '../MediaPreloader/MediaPreloader';
import { getAllImagePaths } from '../../utils/completeMediaScanner';

const MediaPreloaderTest = () => {
  const { imageCache, isLoading, progress, getCachedImage } = useMediaPreloader();
  const [testResults, setTestResults] = useState({});

  useEffect(() => {
    const runTests = async () => {
      const allImages = getAllImagePaths();
      const results = {};

      console.log('🧪 Testing MediaPreloader with', allImages.length, 'images');

      for (const { path, url } of allImages.slice(0, 5)) { // Тестируем первые 5 изображений
        try {
          const cached = getCachedImage(path);
          if (cached) {
            results[path] = { status: 'cached', url: cached };
          } else {
            // Попробуем загрузить вручную
            const img = new Image();
            await new Promise((resolve, reject) => {
              img.onload = () => {
                results[path] = { status: 'loaded', url };
                resolve();
              };
              img.onerror = () => {
                results[path] = { status: 'failed', url };
                reject();
              };
              img.src = url;
            }).catch(() => {});
          }
        } catch (error) {
          results[path] = { status: 'error', error: error.message };
        }
      }

      setTestResults(results);
    };

    if (!isLoading) {
      runTests();
    }
  }, [isLoading, imageCache, getCachedImage]);

  return (
    <div style={{ 
      position: 'fixed', 
      top: 10, 
      right: 10, 
      background: 'rgba(0,0,0,0.8)', 
      color: 'white', 
      padding: '20px', 
      borderRadius: '10px',
      maxWidth: '400px',
      fontSize: '12px',
      zIndex: 9999
    }}>
      <h3>🧪 MediaPreloader Test</h3>
      <div>Loading: {isLoading ? 'Yes' : 'No'}</div>
      <div>Progress: {progress}%</div>
      <div>Cache Size: {Object.keys(imageCache).length}</div>
      
      <h4>Test Results:</h4>
      {Object.entries(testResults).map(([path, result]) => (
        <div key={path} style={{ margin: '5px 0', fontSize: '10px' }}>
          <div style={{ 
            color: result.status === 'cached' ? 'green' : 
                   result.status === 'loaded' ? 'blue' : 'red' 
          }}>
            {result.status === 'cached' ? '✅' : 
             result.status === 'loaded' ? '🔵' : '❌'} 
            {path.split('/').pop()}
          </div>
          <div style={{ color: '#ccc', wordBreak: 'break-all' }}>
            {result.url}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MediaPreloaderTest;
