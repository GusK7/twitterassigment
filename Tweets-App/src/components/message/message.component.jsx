import React from "react";

const Message = ({ message, styleType }) => {
  const messageDetails = () => {
    if (message.details) {
      return message.details.map(detail => <p key={detail}>{detail}</p>);
    } else if (message.detail) {
      return <p key={message.detail}>{message.detail}</p>;
    }
  };

  return (
    <div className={`ui message ${styleType}`}>
      <div className="header">{message.title}</div>
      {messageDetails()}
    </div>
  );
};

export default Message;