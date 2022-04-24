import React, { useState } from "react";
import Article from "./Article";
import { saveAs } from "file-saver";
import "./Snapcard.css";

const Snapcard = () => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const storingUrl = (e) => {
    setUrl(e.target.value);
  };

  const download = (image_url) => {
    console.log(image_url);
    saveAs(image_url, "image.jpg");
  };

  const testing = () => {
    if(url.length <= 1){
      return;
    }
    setLoading(true);
    var apiUrl = `https://screenshot.abstractapi.com/v1/?api_key=92bf1c60a88b46e8ad4adb5c6af8d26e&url=${url}`;
    fetch(apiUrl)
      .then((resp) => {
        return resp;
      })
      .then((data) => {
        download(data.url);
        setLoading(false);
      })
      .catch((data) => {
        console.log("error");
        setLoading(false);
      });
    console.log(url);
    setUrl("");
  };

  let show = (
    <div className="outer">
      <input
        onChange={storingUrl}
        type="url"
        value={url}
        placeholder="Enter the url here"
      />
      <button className="button-85" onClick={testing}>
        Snap
      </button>
    </div>
  );
  if (loading) {
    show = (
      <div className="downloading">
        <h1>Downloading...</h1>
        <h1>It may take sometime.</h1>
      </div>
    );
  }
  return (
    <div className="SnapShot_Card">
      <Article />
      {show}
    </div>
  );
};
export default Snapcard;
