import React from 'react';

const ActiveCourses = ({ courses }) => {
  return (
    <section className="active-courses card">
      <h2 className="section-title">Active Courses</h2>
      <div className="courses-grid">
        {courses.map((course, idx) => (
          <div key={idx} className="course-card">
            <div className="course-header">
              <h3 className="course-title">{course.title}</h3>
              <span className="next-lesson">Next: {course.nextLesson}</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${course.progress}%` }}></div>
            </div>
            <button className="resume-btn">Resume</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ActiveCourses;
