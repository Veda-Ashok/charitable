import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import axios from 'axios'

export default function TalkToFlask() {
  const [message, setMessage] = useState('Waiting to hear from Flask')
  const request = () => {
    axios
      .get(`http://127.0.0.1:5000/flask`)
      .then((response) => {
        console.log(response)
        setMessage(response.data.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return <Button onClick={request}>{message}</Button>
}
