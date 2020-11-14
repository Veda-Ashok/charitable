import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import axios from 'axios'

export default function TalkToFlask() {
  const [message, setMessage] = useState([{ name: 'I am crying' }])
  const request = () => {
    axios
      .get(`/api/searchOrganizations/love`)
      .then((response) => {
        setMessage(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return <Button onClick={request}>{message[0].name}</Button>
}
