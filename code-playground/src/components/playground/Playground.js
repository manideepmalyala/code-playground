import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { updateCodeDoc, getCode } from "../../data/api";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css";

export default function Playground() {
  const [code, setCode] = useState("asdas   ");
  const params = useParams();

  async function updateCode(code) {
    await updateCodeDoc(code, params.sessionId);
    setCode(code);
  }

  const thisGetsCode = async() =>{
    const gotCode = await getCode(params.sessionId);
    setCode(gotCode.code)
  }
  useEffect(() => {
    thisGetsCode()
    return () => {};
  }, []);
  return (
    <Editor
      value={code}
      onValueChange={(code) => updateCode(code)}
      highlight={(code) => highlight(code, languages.js)}
      padding={10}
      style={{
        fontFamily: '"Fira code", "Fira Mono", monospace',
        fontSize: 12,
        border: "1px solid black",
      }}
    />
  );
}
