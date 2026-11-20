import { delay } from './delay'

export const getUser = async () => {
  await delay(500)
  return { id: 1, name: 'Иван Иванов', email: 'ivan@example.com' }
}
