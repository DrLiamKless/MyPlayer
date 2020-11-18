import network from "./network"

export function create(url, body) {
  return network(url, body)
}

export function read(url) {
  return network(url)
}

export function destroy(url, body) {
  return network(url, body, {method: 'DELETE'})
}
