export const getBlogLink = (slug: string) => {
  return `/blog/${slug}`
}

export const getDateStr = (date: string | number | Date) => {
  if (!date) return '--'
  return new Date(date).toLocaleString('en-US', {
    month: 'long',
    day: '2-digit',
    year: 'numeric',
  })
}

export const isPublished = (post: any) => {
  return post.Published === 'Yes'
}

export function normalizeSlug(slug: string): any {
  if (typeof slug !== 'string')
    return slug

  let startingSlash = slug.startsWith('/')
  let endingSlash = slug.endsWith('/')

  if (startingSlash) {
    slug = slug.substr(1)
  }
  if (endingSlash) {
    slug = slug.substr(0, slug.length - 1)
  }
  return startingSlash || endingSlash ? normalizeSlug(slug) : slug
}
