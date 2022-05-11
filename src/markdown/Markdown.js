import React, { useState } from "react";

import ReactMarkdown from "react-markdown";

const Markdown = () => {
  const [isinya, setisinya] = useState("asfaf");

  return (
    <div>
      <div className="container">
        <div style={{ display: "flex", flexDirection: "column", width: "90%" }}>
          <div>
            <textarea
              name=""
              value={isinya}
              onChange={(e) => setisinya(e.target.value)}
              id=""
              cols="30"
              rows="10"
            />
          </div>
          <h1>Output</h1>

          <ReactMarkdown children={isinya} className="pnya" />
        </div>
      </div>
    </div>
  );
};

export default Markdown;
