import { delay } from './delay'

export const createOrder = async (items) => {
  await delay(1000)
  return { items }
}
