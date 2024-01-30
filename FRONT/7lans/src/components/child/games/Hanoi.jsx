import React, { useState } from 'react';
import './HanoiTower.css';

const HanoiTower = () => {
  const [towers, setTowers] = useState([
    [5, 4, 3, 2, 1],
    [],
    []
  ]);

  const [draggedDisk, setDraggedDisk] = useState(null);

  const handleDragStart = (disk) => {
    setDraggedDisk(disk);
  };

  const handleDragOver = (towerIndex) => {
    if (draggedDisk !== null) {
      const movableTowers = towers
        .map((t, tIndex) => (t.length === 0 || t[t.length - 1] > draggedDisk) ? tIndex : null)
        .filter(index => index !== null);

      if (movableTowers.includes(towerIndex)) {
        setTowers((prevTowers) => {
          const updatedTowers = [...prevTowers];
          updatedTowers[towerIndex] = [...updatedTowers[towerIndex], draggedDisk];
          updatedTowers[findTowerWithDisk(draggedDisk)] = updatedTowers[findTowerWithDisk(draggedDisk)].filter(disk => disk !== draggedDisk);
          return updatedTowers;
        });
      }
    }
  };

  const handleDragEnd = () => {
    setDraggedDisk(null);
  };

  const findTowerWithDisk = (disk) => {
    for (let i = 0; i < towers.length; i++) {
      if (towers[i].includes(disk)) {
        return i;
      }
    }
    return -1;
  };

  return (
    <div className="hanoi-container">
      {towers.map((tower, index) => (
        <div
          key={index}
          className="hanoi-tower"
          onDragOver={() => handleDragOver(index)}
          onDrop={() => handleDragOver(index)}
        >
          {tower.map((disk, diskIndex) => (
            <div
              key={diskIndex}
              className={`hanoi-disk hanoi-disk-${disk}`}
              draggable
              onDragStart={() => handleDragStart(disk)}
              onDragEnd={handleDragEnd}
            >
              {disk}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default HanoiTower;
