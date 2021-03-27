import React from "react";

export async function get(url) {
  const token = localStorage.jwt;

  let response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'Authorization': `Bearer ${token}`
    }
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