'use client'
import { BaseSyntheticEvent, FormEventHandler, useRef, useState } from 'react'

import styles from './page.module.css'

export default function Home() {
  const emailRef = useRef(null)
  const feedbackRef = useRef(null)
  const [feedbackItems, setFeedbackItems] = useState([])

  const submitFormHandler = (event: BaseSyntheticEvent) => {
    event.preventDefault()
    let enteredEmail = ''
    if (emailRef !== null && emailRef.current !== null) {
      enteredEmail = emailRef.current.value
    }
    let enteredFeedback = ''
    if (feedbackRef !== null && feedbackRef.current !== null) {
      enteredFeedback = feedbackRef.current.value
    }
    console.log('Entered values:', enteredEmail, ':', enteredFeedback)
    const reqBody = { email: enteredEmail, text: enteredFeedback }
    fetch('/api/feedback', {
      method: 'POST',
      body: JSON.stringify(reqBody),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => response.json())
      .then(data => console.log(data))
  }

  const loadFeedbackHandler = () => {
    fetch('/api/feedback')
      .then(response => response.json())
      .then(data => setFeedbackItems(data.feedbacks))
  }

  return (
    <main className={styles.main}>
      <h1>The Home Page</h1>
      <form onSubmit={submitFormHandler}>
        <div>
          <label htmlFor="email">Your Email Address</label>
          <input type="email" id="email" ref={emailRef} />
        </div>
        <div>
          <label htmlFor="feedback">Your Feedback</label>
          <textarea id="feedback" rows={5} ref={feedbackRef} />
        </div>
        <button>Send feedback</button>
      </form>
      <button onClick={loadFeedbackHandler}>Show feedback's</button>
      <ul>
        {feedbackItems.map(item => (
          <li key={item.id}>{item.text}</li>
        ))}
      </ul>
    </main>
  )
}
