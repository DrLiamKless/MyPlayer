import { Paper } from "@material-ui/core"
import network from "./network"

export function create(url, body) { // todo: use await
  return network(url, body)
}

export function read(url) {
  return network(url)
}

