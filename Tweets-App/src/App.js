import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Spinner from "./components/spinner/spinner.component";
import ErrorBoundary from "./components/error-boundary/error-boundary.component";
import './App.css';

const Navbar = lazy(() => import("./components/navbar/navbar.component"));
const TweetFeed = lazy(() => import("./components/tweet-feed/tweet-feed.component"));


function App() {
  return (
    <div className="ui container">
      <div className="introduction"></div>
      <h1 className="ui header">
        <div className="content">
          Twitter Whale Stream
          <div className="sub header">Powered by Twitter Bird!</div>
        </div>
      </h1>
      <div className="ui container">
        <ErrorBoundary>
          <Suspense fallback={<Spinner />}>
            <BrowserRouter>
              <Routes>
                <Route exact path="/" element={<Navbar />} />
                <Route exact path="/tweets" element={<TweetFeed />} />
              </Routes>
            </BrowserRouter>
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
}

export default App;
