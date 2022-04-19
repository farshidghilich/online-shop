import React from 'react'
import spinner from "../gif/Spinner.gif"
function Loading() {
  return (
    <div style={{ width: "100%", textAlign: "center" }}>
      <img src={spinner} alt="Loading" />
      <div>بارگزاری</div>
    </div>
  )
}

export default Loading
