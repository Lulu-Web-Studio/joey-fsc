import { defineLive } from "next-sanity/live"
import { client } from './client'
import { token } from './token'
import { apiVersion } from '../env'

export const { sanityFetch, SanityLive } = defineLive({
  client: client.withConfig({
    apiVersion,
  }),
  serverToken: token,
})
