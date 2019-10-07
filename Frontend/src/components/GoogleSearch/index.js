// import React from "react";
// import { Helmet } from "react-helmet";
// import IconButton from "@material-ui/core/IconButton";
// import CloseIcon from "@material-ui/icons/ArrowBack";

// const GoogleSearchPure = props => {
//   const { zIndex, setZIndex, src, setSrc } = props;
//   return (
//     <React.Fragment>
//       <Helmet>
//         <script
//           src="https://cse.google.com/cse.js?cx=009191541552806974982:vdymiye15g8"
//           async="true"
//           type="text/javascript"
//         />
//       </Helmet>
//       <div
//         style={{
//           overflow: zIndex === 2 && "hidden",
//           position: "relative"
//         }}
//       >
//         <div id="yeteh-search" className="gcse-search"  data-resultsUrl="http://www.example.com" />
//         {zIndex === 2 && (
//           <>
//             <IconButton
//               style={{
//                 position: "absolute",
//                 zIndex: zIndex + 3,
//                 color: "black",
//                 left: "10px",
//                 top: "5px",
//                 background: "#dcdcdc"
//               }}
//               onClick={() => {
//                 setZIndex(-1);
//                 setSrc(undefined);
//               }}
//             >
//               <CloseIcon />
//             </IconButton>
//             <iframe
//               style={{
//                 position: "absolute",
//                 top: "0",
//                 left: "0",
//                 width: "100%",
//                 height: "100%",
//                 border: "0",
//                 zIndex: zIndex + 2,
//                 background: "white"
//               }}
//               src={src}
//               id="yeteh-iframe"
//               title="Yeteh"
//             />
//           </>
//         )}
//       </div>
//     </React.Fragment>
//   );
// };

// export default GoogleSearchPure;
