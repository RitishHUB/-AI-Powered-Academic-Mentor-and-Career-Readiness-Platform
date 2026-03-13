import React from 'react';

const CalendarHeatmap = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth(); // 0-indexed
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Dummy data: 4 days with specific intensity
  const dummyData = {
    2: 1,  // Light study on 2nd
    5: 2,  // Moderate study on 5th
    12: 3, // Intense study on 12th
    20: 2  // Moderate study on 20th
  };

  const activityLevels = Array.from({ length: daysInMonth }, (_, i) => {
    const day = i + 1;
    return dummyData[day] ?? 0;
  });

  const getColor = (level) => {
    switch (level) {
      case 0: return '#e2e8f0'; // light gray
      case 1: return '#c3dafe'; // soft blue
      case 2: return '#7f9cf5'; // medium blue
      case 3: return '#5a67d8'; // deep blue
      default: return '#e2e8f0';
    }
  };

  const formatDate = (day) => {
    const date = new Date(year, month, day);
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const yyyy = date.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
  };

  return (
    <section className="calendar-heatmap card">
      <h2 className="section-title">Study Activity</h2>
      <div className="heatmap-grid">
        {activityLevels.map((level, idx) => {
          const dateLabel = formatDate(idx + 1);
          const intensityLabel = ['No Study', 'Light', 'Moderate', 'Intense'][level];
          return (
            <div
              key={idx}
              className="heatmap-cell"
              style={{ backgroundColor: getColor(level) }}
              title={`${dateLabel}: ${intensityLabel}`}
            />
          );
        })}
      </div>
      <div className="heatmap-legend">
        <span>🟦 Intensity: </span>
        <span className="legend-box" style={{ background: getColor(0) }}></span>
        <span className="legend-box" style={{ background: getColor(1) }}></span>
        <span className="legend-box" style={{ background: getColor(2) }}></span>
        <span className="legend-box" style={{ background: getColor(3) }}></span>
      </div>
    </section>
  );
};

export default CalendarHeatmap;
