import React from "react";

export async function post(url, values) {
  console.log('Received values of form: ', JSON.stringify(values));

  let response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(values)
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