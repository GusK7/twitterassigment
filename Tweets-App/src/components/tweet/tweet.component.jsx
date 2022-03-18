import React from "react";
import "./tweet.css";

const Tweet = ({ json }) => {
  const { tweet, slacked } = json;

  return (
    <div className="row">
      <div className="col-md-4"></div>
      <div className="container">
        <div className="col-md-4">
          <div className="panel panel-danger">
            <div className="panel-heading">
              <h3 className="panel-title">
                <i className="fa fa-twitter-square" aria-hidden="true"></i>
                Slacked:{" "}
                {slacked ? (
                  <i className="fa fa-check" aria-hidden="true"></i>
                ) : (
                  <i className="fa fa-times" aria-hidden="true"></i>
                )}
              </h3>
            </div>
            <div className="panel-body">{tweet}</div>
          </div>
        </div>
      </div>
      <div className="col-md-4"></div>
    </div>
  );
};

export default Tweet;
