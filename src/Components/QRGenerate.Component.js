import React from 'react'
import {QRCode} from 'react-qr-svg'

function QRGenarate({value = ''}) {
  return <QRCode value={value} bgColor="#FFFFFF" fgColor="#000000" level="Q" style={{width: 256}} />
}

export default QRGenarate
