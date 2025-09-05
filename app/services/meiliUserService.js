// app/services/meiliUserService.js
import { MeiliSearch } from 'meilisearch'

const client = new MeiliSearch({
  host: process.env.MEILI_HOST,
  apiKey: process.env.MEILI_API_KEY,
})

const index = client.index('users') // 👈 nouvel index

export const indexUsers = async (data) => {
  return await index.addDocuments(data, { primaryKey: 'id' })
}

export const searchInUsers = async (query) => {
  return await index.search(query)
}
