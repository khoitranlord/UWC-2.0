import React, { useState } from "react";

export const CookieCard = () => {
  return (
    <div className="card border-light shadow-sm mb-4">
      <div className="card-body">
        <form action="">
          <div class="form-row align-items-center">
            <div className="col-auto">
              <div class="custom-file">
                <input
                  type="file"
                  class="custom-file-input"
                  id="validatedCustomFile"
                  required
                />
                <label class="custom-file-label" for="validatedCustomFile">
                  Choose file...
                </label>
                <div class="invalid-feedback">
                  Example invalid custom file feedback
                </div>
              </div>
            </div>
            <div className="col-auto">
              <button class="btn btn-primary" type="submit">
                Verify
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

const ToolCard = () => {
  const [urlList, setUrlList] = useState("");
  const [submittedText, setSubmittedText] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(urlList);
    setSubmittedText(urlList);
    setUrlList("");
  };
  return (
    <div>
      <div className="card border-light shadow-sm mb-4">
        <div className="card-body">
          <form onClick={handleSubmit}>
            <div class="form-row align-items-center">
              <div class="col-sm-3 my-1">
                <label class="sr-only" for="inlineFormInputName">
                  Enter facebook groups/pages 's url
                </label>
                <textarea
                  onChange={(event) => {
                    setUrlList(event.target.value);
                    console.log(urlList);
                  }}
                  value={urlList}
                  class="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                ></textarea>
              </div>
              <div class="col-auto my-1">
                <button type="submit" class="btn btn-primary">
                  Crawl
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      {submittedText && (
        <p style={{ color: "red" }}>You just typed: {submittedText}</p>
      )}
    </div>
  );
};

export default ToolCard;
