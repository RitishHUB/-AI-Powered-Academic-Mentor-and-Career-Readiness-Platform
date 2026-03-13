import React from "react";
import "./pqp.css";

const exams = [
  {
    title: "TNBC",
    img: "https://tnpsc.academy/wp-content/uploads/2020/10/TNPSC-Logo-768x768.png",
    qps: [
      { name: "QP-1 (2022)", link: "https://drive.google.com/file/d/1NUdVBzNMCej0ZqU6S7LgPoZWLYbzTEOk/preview" },
      { name: "QP-2 (2023)", link: "https://drive.google.com/file/d/1H3wGMkZrurfNQsR-64em1GxCm9qC6c85/preview" },
      { name: "QP-3 (2024)", link: "https://drive.google.com/file/d/1lhMuvaAbsrdLie9eOX9x6CjOaVtX4Ipd/preview" },
      { name: "QP-4 (2025)", link: "https://drive.google.com/file/d/1Tv61Wxn2PmuqHg5wFJJDr6xqlVIVffmz/preview" },
    ],
  },
  {
    title: "GATE",
    img: "https://eduxact.com/wp-content/uploads/2022/01/GATE-Eligibility.png",
    qps: [
      { name: "QP-1 (2022)", link: "https://drive.google.com/file/d/1NUdVBzNMCej0ZqU6S7LgPoZWLYbzTEOk/preview" },
      { name: "QP-2 (2023)", link: "https://drive.google.com/file/d/1H3wGMkZrurfNQsR-64em1GxCm9qC6c85/preview" },
      { name: "QP-3 (2024)", link: "https://drive.google.com/file/d/1lhMuvaAbsrdLie9eOX9x6CjOaVtX4Ipd/preview" },
      { name: "QP-4 (2025)", link: "https://drive.google.com/file/d/1Tv61Wxn2PmuqHg5wFJJDr6xqlVIVffmz/preview" },
    ],
  },
  {
    title: "UPSC",
    img: "https://wallpaperaccess.com/full/9435303.jpg",
    qps: [
      { name: "QP-1 (2022)", link: "https://drive.google.com/file/d/1NUdVBzNMCej0ZqU6S7LgPoZWLYbzTEOk/preview" },
      { name: "QP-2 (2023)", link: "https://drive.google.com/file/d/1H3wGMkZrurfNQsR-64em1GxCm9qC6c85/preview" },
      { name: "QP-3 (2024)", link: "https://drive.google.com/file/d/1lhMuvaAbsrdLie9eOX9x6CjOaVtX4Ipd/preview" },
      { name: "QP-4 (2025)", link: "https://drive.google.com/file/d/1Tv61Wxn2PmuqHg5wFJJDr6xqlVIVffmz/preview" },
    ],
  },
  {
    title: "CTET",
    img: "https://img.studydekho.com/uploads/c/2022/3/17631-c-whatsapp-image-2022-03-28-at-94428-pm.jpeg",
    qps: [
      { name: "QP-1 (2022)", link: "https://drive.google.com/file/d/1NUdVBzNMCej0ZqU6S7LgPoZWLYbzTEOk/preview" },
      { name: "QP-2 (2023)", link: "https://drive.google.com/file/d/1H3wGMkZrurfNQsR-64em1GxCm9qC6c85/preview" },
      { name: "QP-3 (2024)", link: "https://drive.google.com/file/d/1lhMuvaAbsrdLie9eOX9x6CjOaVtX4Ipd/preview" },
      { name: "QP-4 (2025)", link: "https://drive.google.com/file/d/1Tv61Wxn2PmuqHg5wFJJDr6xqlVIVffmz/preview" },
    ],
  },
  {
    title: "SSC&GCL",
    img: "https://static.wixstatic.com/media/c47c84_8da6d920eebc4f88831a7fe7515c96d8~mv2.png/v1/fill/w_777,h_780,al_c,q_90,enc_auto/c47c84_8da6d920eebc4f88831a7fe7515c96d8~mv2.png",
    qps: [
      { name: "QP-1 (2022)", link: "https://drive.google.com/file/d/1NUdVBzNMCej0ZqU6S7LgPoZWLYbzTEOk/preview" },
      { name: "QP-2 (2023)", link: "https://drive.google.com/file/d/1H3wGMkZrurfNQsR-64em1GxCm9qC6c85/preview" },
      { name: "QP-3 (2024)", link: "https://drive.google.com/file/d/1lhMuvaAbsrdLie9eOX9x6CjOaVtX4Ipd/preview" },
      { name: "QP-4 (2025)", link: "https://drive.google.com/file/d/1Tv61Wxn2PmuqHg5wFJJDr6xqlVIVffmz/preview" },
    ],
  },
  {
    title: "RRB",
    img: "https://tse4.mm.bing.net/th/id/OIP.-_DPLNmdrEj4epmWfDNQdQAAAA?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
    qps: [
      { name: "QP-1 (2022)", link: "https://drive.google.com/file/d/1NUdVBzNMCej0ZqU6S7LgPoZWLYbzTEOk/preview" },
      { name: "QP-2 (2023)", link: "https://drive.google.com/file/d/1H3wGMkZrurfNQsR-64em1GxCm9qC6c85/preview" },
      { name: "QP-3 (2024)", link: "https://drive.google.com/file/d/1lhMuvaAbsrdLie9eOX9x6CjOaVtX4Ipd/preview" },
      { name: "QP-4 (2025)", link: "https://drive.google.com/file/d/1Tv61Wxn2PmuqHg5wFJJDr6xqlVIVffmz/preview" },
    ],
  },
];

const Pqp = () => {
  const handleQuit = () => {
    window.location.href = "/main"; // redirect to homepage or login
  };

  return (
    <div className="pqp-container">
      <header className="pqp-header">
        <button className="quit-btn" type="button" onClick={handleQuit}>
          ❌ Quit
        </button>
        <h2>P&amp;QP</h2>
        <button className="profile-btn" type="button">👤</button>
      </header>

      <div className="pqp-grid">
        {exams.map((exam, index) => (
          <div key={index} className="pqp-card">
            <img src={exam.img} alt={exam.title} />
            <h3>{exam.title}</h3>
            <ul>
              {exam.qps.map((qp, i) => (
                <li key={i}>
                  <a href={qp.link} target="_blank" rel="noopener noreferrer">
                    {qp.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pqp;
