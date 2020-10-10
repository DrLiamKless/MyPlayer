export default function network(url ,body, {...customConfig} = {}) {
  
  const getToken = () => {
    return localStorage.getItem('token');
  }

  const headers = {
    "Content-Type": "application/json; charrset=utf-8",
    "Authorization": "bearer " + getToken()
  };

  const config = {
    method: body ? 'POST' : 'GET',
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers
    },
  }

  if (body != null) {
    config.body = JSON.stringify(body);
  } 

  return fetch(url, config)   
    .then(async response => {
      const data = await response.json()
      if (response.ok) {
        return data
      } else {
        return Promise.reject(`${response.status} : ''${data.message}'`);
      }
    })
}
