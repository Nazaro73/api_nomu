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
  try {
    return await index.search(query)
  } catch (error) {
    // Si l'index n'existe pas encore, retourner un résultat vide
    if (error.code === 'index_not_found') {
      return { hits: [], query, limit: 20, offset: 0, estimatedTotalHits: 0 }
    }
    throw error
  }
}
