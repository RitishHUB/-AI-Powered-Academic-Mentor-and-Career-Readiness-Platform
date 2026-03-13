import React, { useState } from 'react';
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip,
  CartesianGrid, Legend, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';
import './StudyChart.css';

const StudyChart = () => {
  const [view, setView] = useState('weekly');

  const COLORS = ['#667eea', '#ff7f50', '#4caf50'];

  // 🔹 Dummy weekly data
  const weeklyData = [
    { day: 'Sun', hours: 2 },
    { day: 'Mon', hours: 3.5 },
    { day: 'Tue', hours: 1.8 },
    { day: 'Wed', hours: 4 },
    { day: 'Thu', hours: 2.2 },
    { day: 'Fri', hours: 3 },
    { day: 'Sat', hours: 5 }
  ];

  // 🔹 Dummy monthly data
  const monthlyData = [
    { month: 'Jan', hours: 45 },
    { month: 'Feb', hours: 52 },
    { month: 'Mar', hours: 60 },
    { month: 'Apr', hours: 48 },
    { month: 'May', hours: 70 },
    { month: 'Jun', hours: 55 }
  ];

  // 🔹 Dummy activity breakdown
  const activityData = [
    { name: 'Books', value: 65 },
    { name: 'Quizzes', value: 40 },
    { name: 'AI Learning', value: 35 }
  ];

  return (
    <div className="study-chart card">
      <h2 className="section-title">Study Progress 📊</h2>

      <div className="chart-controls">
        <button className={view === 'weekly' ? 'active' : ''} onClick={() => setView('weekly')}>Weekly</button>
        <button className={view === 'monthly' ? 'active' : ''} onClick={() => setView('monthly')}>Monthly</button>
      </div>

      <div className="chart-wrapper">
        <div className="main-chart">
          {view === 'weekly' && (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyData} margin={{ top: 20, right: 20, left: 0, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="hours" fill="#667eea" radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}

          {view === 'monthly' && (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData} margin={{ top: 20, right: 20, left: 0, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="hours" stroke="#ff7f50" strokeWidth={3} dot={{ r: 5 }} activeDot={{ r: 7 }} />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>

        <div className="pie-chart">
          <h3 className="pie-title">Overall Activity 🥧</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={activityData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={90}
                label
                animationDuration={1200}
              >
                {activityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default StudyChart;
