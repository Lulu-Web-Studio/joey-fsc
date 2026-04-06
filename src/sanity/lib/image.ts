import createImageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from "@sanity/image-url/lib/types/types"
import { dataset, projectId } from '../env'

const builder = createImageUrlBuilder({ projectId, dataset })

export const urlFor = (source: SanityImageSource) => {
  return builder.image(source)
}

type ImageLike = {
  sanityImage?: {
    asset?: {
      url?: string | null
    } | null
  } | null
  staticPath?: string | null
} | null | undefined

export const getImageUrl = (image: ImageLike, fallback: string) => {
  return image?.sanityImage?.asset?.url || image?.staticPath || fallback
}
