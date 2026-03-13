// import React from "react";
// import { useParams } from "react-router-dom";
// import "./Books.css";

// // Map exam names to Google Drive links
// const pdfLinks = {
//   tnpsc: "https://drive.google.com/file/d/1C1LkVztftT-sxim0FtD1BQn6Wg6FBo8p/view?usp=sharing",
//   gate: "https://drive.google.com/file/d/1kAnrzP5KnifJ1o-Wl515kMQlA7JiNo0k/view?usp=drive_link",
//   upsc: "https://drive.google.com/file/d/1kVYSa5VJwv6QE7s4_ktS4CwOs1wE0RX7/view?usp=drive_link",
//   ctet: "https://drive.google.com/file/d/your_ctet_file_id/view?usp=sharing",
//   ssc: "https://drive.google.com/file/d/your_ssc_file_id/view?usp=sharing",
//   rrb: "https://drive.google.com/file/d/your_rrb_file_id/view?usp=sharing",
// };

// // Helper: convert any /view link → /preview
// const getPreviewLink = (url) => {
//   if (!url) return null;
//   return url.replace("/view?usp=sharing", "/preview").replace("/view?usp=drive_link", "/preview").replace("/view", "/preview");
// };

// const Books = () => {
//   const { examName } = useParams();
//   const pdfUrl = getPreviewLink(pdfLinks[examName]);

//   if (!pdfUrl) {
//     return (
//       <h2 style={{ textAlign: "center", marginTop: "50px" }}>
//         ❌ No PDF found for {examName.toUpperCase()}
//       </h2>
//     );
//   }

//   return (
//     <div className="books-container">
//       <h1 className="books-title">📚 {examName.toUpperCase()} Study Material</h1>
//       <div className="pdf-viewer">
//         <iframe
//           src={pdfUrl}
//           width="100%"
//           height="600px"
//           allow="autoplay"
//           title={`${examName} PDF`}
//           className="pdf-frame"
//         ></iframe>
//       </div>
//     </div>
//   );
// };

// export default Books;
