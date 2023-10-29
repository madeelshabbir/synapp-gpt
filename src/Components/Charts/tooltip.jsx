import React from "react";
//import {Tooltip} from "react-tooltip";
import Tooltip from "@material-ui/core/Tooltip";
import {  makeStyles } from '@material-ui/core';
const useStyles = makeStyles({
    tooltip: {
      backgroundColor: '#F3F4F6', // customize the background color
      color: 'Black', // customize the text color
      borderRadius: '4px',
      fontSize:'15px',
      width:'auto',
    
       // customize the border radius
      // add any other CSS properties you want to customize
    },
  });
  const useStyless = makeStyles({
    tooltip: {
      backgroundColor: '#FAF7F2', // customize the background color
      color: 'Black', // customize the text color
      borderRadius: '4px',
      fontSize:'15px',
      width:'auto',
    
       // customize the border radius
      // add any other CSS properties you want to customize
    },
  });

export const ExampleTool = ({ tooltip,orignal }) => {
    const classes = useStyles();
  return (
    <div>
      <Tooltip title={tooltip} placement="top"  classes={{ tooltip: classes.tooltip }}>
        <span>{orignal}...</span>
      </Tooltip>
    </div>
    
  );
};

export const ChatTooltip = ({ tooltip,orignal }) => {
    const classes = useStyless();
  return (
    <div>
      <Tooltip title={tooltip} placement="top"  classes={{ tooltip: classes.tooltip }}>
        <span>{orignal}</span>
      </Tooltip>
    </div>
    
  );
};






// ...

{/* <tr key={index} className="cursor-pointer text-sm text-center shadow-lg">
  <td className="p-2">{index}</td>
  <td className="p-2">{chat.question}</td>
  <td className="p-2">
    {chat.answer.length > 20 ? (
      <div data-tip={chat.answer}>
        {chat.answer.slice(0, 20)}...
        <ExampleTool>
          <span>{chat.answer}</span>
        </ExampleTool>
      </div>
    ) : (
      chat.answer
    )}
  </td>
  <td className="p-2 justify-center flex gap-5 items-center text-lg">
    <span
      className={`hover:scale-110 ${
        chat.status === 1 ? "text-green-600" : ""
      }`}
    >
      <FiThumbsUp />
    </span>
    <span
      className={`hover:scale-110 ${
        chat.status === 0 ? "text-red-500" : ""
      }`}
    >
      <FiThumbsDown />
    </span>
  </td>
</tr> */}



// import React from "react";

// import Tooltip from "react-tooltip";
// export const ExampleTool = () => {
//     return (
//         <div className="App">
//         <button data-tip data-for="registerTip">
//           Register
//         </button>
  
//         <ReactTooltip id="registerTip" place="top" effect="solid">
//           Tooltip for the register button
//         </ReactTooltip>
//       </div>
//     );
//   };
  