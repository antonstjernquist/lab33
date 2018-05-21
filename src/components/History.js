import "../css/history.css";
import React from "react";

function History(props) {
  let reduced = props.historyList.reduce((acc, curr) => {
    if (acc && curr) {
      return Object.keys(curr).length > Object.keys(acc).length ? curr : acc;
    } else {
      return null;
    }
  });

  let ths = Object.keys(reduced).map((key, index) => {
    return <th key={index}>{key}</th>;
  });
  let wrappedHistory = props.historyList.map((item, index) => {
    let tds = Object.keys(reduced).map((key, index) => {
      return <td key={index}>{item[key]}</td>;
    });

    return (
      <React.Fragment key={index}>
        <tr>
          <td>{index + 1}</td>
          {tds}
        </tr>
      </React.Fragment>
    );
  });

  return (
    <div className="div-wrapper">
      <table className="history-wrapper">
        <thead>
          <tr>
            <th>&nbsp;</th>
            {ths}
          </tr>
        </thead>
        <tbody>{wrappedHistory}</tbody>
      </table>
    </div>
  );
}

export default History;
