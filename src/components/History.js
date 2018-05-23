import "../css/history.css";
import React from "react";
const Wrapper = (props) => {
    console.log("ITEM", props.item);
    const keys = Object.keys(props.item);
    console.log("Keys", keys);

    const scraped = keys.map((key, index) => {
        return (
            <React.Fragment key={index}>
                <br />
                <span className="title">{key}</span>
                <span className="notTitle">{JSON.stringify(props.item[key]).slice(0, 100)}</span>
            </React.Fragment>
        )
    });
  return (
      <div className="scraped">
          <span className="title">{props.keypass + 1}</span>
          {scraped}
      </div>
  )
};
function History(props) {
  const divs = props.historyList.map((item, index) => {
    return <Wrapper keypass={index} key={index} item={item} />;
  });
  return <div className="div-wrapper">{divs}</div>;
}

export default History;
