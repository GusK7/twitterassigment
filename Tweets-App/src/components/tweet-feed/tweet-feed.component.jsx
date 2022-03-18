import React, { useEffect, useReducer } from "react";
import Tweet from "../tweet/tweet.component";
import { io } from "socket.io-client";
import Message from "../message/message.component";
import Spinner from "../spinner/spinner.component";
import Error from "../error/error.component";
import axios from "axios";

const reducer = (state, action) => {
  switch (action.type) {
    case "display_tweet":
      return {
        ...state,
        tweets: action.payload,
        isWaiting: false,
      };
    case "throw_error":
      return { ...state, error: action.payload, isWaiting: false };
    default:
      return state;
  }
};
const TweetFeed = () => {
  const initialState = {
    tweets: [],
    error: false,
    isWaiting: true,
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const { tweets, error, isWaiting } = state;

  const throwError = (err) => {
    console.log(err);
    dispatch({ type: "throw_error", payload: true });
  };

  useEffect(() => {
    axios("http://localhost:3501/tweets")
      .then((response) => {
        if (response && response.data) {
          dispatch({ type: "display_tweet", payload: response.data });
        }
      })
      .catch((err) => {
        throwError(err);
      });

    const socket = io("http://localhost:3023", {
      transports: ["websocket", "polling", "flashsocket"],
    });
    socket.on("connect_error", (err) => {
      throwError(err);
    });

    socket.on("tweets", () => {
      axios("http://localhost:3501/tweets")
        .then((response) => {
          if (response && response.data) {
            dispatch({ type: "display_tweet", payload: response.data });
          }
        })
        .catch((err) => {
          throwError(err);
        });
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  const errorMessage = () => {
    return <Error />;
  };

  const waitingMessage = () => {
    const message = {
      title: "Still working",
      detail: "Waiting for new tweets to be posted",
    };
    return (
      <React.Fragment>
        <div>
          <Message key={message.title} message={message} styleType="success" />
        </div>
        <Spinner />
      </React.Fragment>
    );
  };

  const showTweets = () => {
    return (
      <React.Fragment>
        {tweets.map((tweet) => (
          <Tweet key={tweet._id} json={tweet} />
        ))}
      </React.Fragment>
    );
  };

  return (
    <div>
      {error && errorMessage()}
      {isWaiting && waitingMessage()}
      {tweets.length && !error && showTweets()}
    </div>
  );
};

export default TweetFeed;
