import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function MyPage() {
  const [prompt, setPrompt] = useState("")
  const [answer, setAnswer] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setIsLoading(true)
    try {
      const response = await fetch("/api/get-answer", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ prompt: prompt })
      })
      const data = await response.json()
      console.log("🚀 ~ file: index.js:23 ~ handleSubmit ~ data:", data)
      setAnswer(data.text.trim())
      setIsLoading(false)
    } catch (error) {
      console.log("🚀 ~ file: index.js:27 ~ handleSubmit ~ error:", error)
      
    }
    
  }

  function handleChange(e) {
    setPrompt(e.target.value)
  }

  return (
    <div className="container">
      <Head>
        <title>DarshanaGPT+</title>
        <link rel="icon" href="/dar.png" />
      </Head>
        <img src="/dar.png"/><h3>DarshanaGPT+</h3>
        <h3>Ask Darshana to help you</h3>
      <form className="our-form" onSubmit={handleSubmit}>
        <input className="prompt-field" type="text" onChange={handleChange} />
        <button className="prompt-button">Go!</button>
      </form>

      {isLoading && <div className="loading-spinner"></div>}

      <div className="answer-area">{answer}</div>
    </div>
  )
}
