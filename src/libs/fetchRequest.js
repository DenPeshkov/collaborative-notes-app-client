import React from "react";

export async function fetchRequest(url, values, method) {
  const token = localStorage.jwt;
  console.log('Received values of form: ', JSON.stringify(values));

  let response = await fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'Authorization': `Bearer ${token}`
    },
    body: values === null ? null : JSON.stringify(values)
  });

  if (response.ok) {
    return response;
  } else {
    let exception = await response.text();
    let status = response.status;
    throw {
      status: status,
      exception: exception
    }
  }
}