export default function network(url ,body, {...customConfig} = {}) {
  
    const headers = {
      "Content-Type": "application/json; charrset=utf-8"
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
  
  // network.get = (url, options) => network(url, {method: "GET", ...options});
  // network.put = (url, body, options) => network(url,  body, {method: "PUT", ...options});
  // network.post = (url, body, options) => network(url, body, {method: "POST", ...options});
  // network.delete = (url, options) => network(url, {method: "DELETE", ...options});
  