import React from 'react'

export default function DateFormat({ data }) {

  const date = new Date(data);
  function dateFormat(date) {
    return date.getFullYear() + "-"
      + (date.getMonth() + 1 > 9 ?
        date.getMonth() + 1 :
        "0" + (date.getMonth() + 1)) + "-"
      + (date.getDate() > 9 ?
        date.getDate() :
        "0" + date.getDate());
  };

  return (
    <p>{dateFormat(date)}</p>
  )
}
