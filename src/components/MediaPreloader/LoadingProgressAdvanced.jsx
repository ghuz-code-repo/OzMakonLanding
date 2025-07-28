import React, { useState } from 'react';
import { useMediaLoadingStats } from '../../hooks/useCachedImage';

const LoadingProgressAdvanced = () => {
  const { overallProgress, getGroupProgress, groupsInfo, allGroupsCompleted } = useMediaLoadingStats();
  const [isVisible, setIsVisible] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);

  const groups = Object.keys(groupsInfo);
  if (groups.length === 0 || (!isVisible && allGroupsCompleted)) return null;

  const handleToggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const handleToggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  if (!isVisible) {
    return (
      <div style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        background: 'rgba(0, 0, 0, 0.8)',
        color: 'white',
        padding: '10px',
        borderRadius: '8px',
        fontSize: '12px',
        zIndex: 9999,
        cursor: 'pointer'
      }} onClick={handleToggleVisibility}>
        📊 {overallProgress}%
      </div>
    );
  }

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      background: 'rgba(0, 0, 0, 0.9)',
      color: 'white',
      padding: '15px',
      borderRadius: '12px',
      fontSize: '12px',
      zIndex: 9999,
      maxWidth: '320px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
      border: '1px solid rgba(255, 255, 255, 0.1)'
    }}>
      {/* Заголовок с кнопками управления */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: isMinimized ? '0' : '15px'
      }}>
        <h4 style={{ margin: '0', fontSize: '14px', fontWeight: 'bold' }}>
          📊 Загрузка медиафайлов
        </h4>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={handleToggleMinimize}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              fontSize: '12px',
              padding: '2px 6px',
              borderRadius: '4px',
              opacity: 0.8
            }}
            onMouseOver={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.1)'}
            onMouseOut={(e) => e.target.style.background = 'transparent'}
          >
            {isMinimized ? '▼' : '▲'}
          </button>
          <button
            onClick={handleToggleVisibility}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              fontSize: '12px',
              padding: '2px 6px',
              borderRadius: '4px',
              opacity: 0.8
            }}
            onMouseOver={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.1)'}
            onMouseOut={(e) => e.target.style.background = 'transparent'}
          >
            ✕
          </button>
        </div>
      </div>

      {/* Общий прогресс */}
      {!isMinimized && (
        <>
          <div style={{ marginBottom: '15px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <span style={{ fontWeight: 'bold', color: '#4CAF50' }}>Общий прогресс:</span>
              <span style={{ fontWeight: 'bold' }}>{overallProgress}%</span>
            </div>
            <div style={{
              width: '100%',
              height: '8px',
              background: '#333',
              borderRadius: '4px',
              overflow: 'hidden'
            }}>
              <div style={{
                width: `${overallProgress}%`,
                height: '100%',
                background: 'linear-gradient(90deg, #4CAF50, #8BC34A)',
                transition: 'width 0.5s ease',
                borderRadius: '4px'
              }} />
            </div>
          </div>

          {/* Прогресс по группам */}
          <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
            {groups.map(group => {
              const groupState = groupsInfo[group];
              const progress = getGroupProgress(group);
              const isCompleted = groupState.status === 'completed';
              
              return (
                <div key={group} style={{ marginBottom: '12px' }}>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    marginBottom: '4px'
                  }}>
                    <span style={{ 
                      fontWeight: '500',
                      color: isCompleted ? '#4CAF50' : '#fff'
                    }}>
                      {isCompleted ? '✅' : '⏳'} {group}:
                    </span>
                    <span style={{ fontSize: '11px' }}>
                      {groupState.loaded}/{groupState.total}
                    </span>
                  </div>
                  <div style={{
                    width: '100%',
                    height: '4px',
                    background: '#333',
                    borderRadius: '2px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      width: `${progress}%`,
                      height: '100%',
                      background: isCompleted 
                        ? 'linear-gradient(90deg, #4CAF50, #66BB6A)' 
                        : 'linear-gradient(90deg, #2196F3, #42A5F5)',
                      transition: 'width 0.3s ease'
                    }} />
                  </div>
                  {groupState.failed > 0 && (
                    <div style={{ 
                      color: '#f44336', 
                      fontSize: '10px', 
                      marginTop: '2px',
                      opacity: 0.8
                    }}>
                      ⚠️ Ошибок: {groupState.failed}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Статус */}
          {allGroupsCompleted && (
            <div style={{
              marginTop: '10px',
              padding: '8px',
              background: 'rgba(76, 175, 80, 0.2)',
              borderRadius: '6px',
              textAlign: 'center',
              color: '#4CAF50',
              fontSize: '11px',
              fontWeight: 'bold'
            }}>
              🎉 Все медиафайлы загружены!
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default LoadingProgressAdvanced;
