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

export function getCoverUrl(coverUrl: string) {
  if (coverUrl === undefined) return ''
  if (!coverUrl.indexOf('/images')) {
    return "https://www.notion.so/image/https%3A%2F%2Fwww.notion.so" + encodeURIComponent(coverUrl)
  } else if (!coverUrl.indexOf('http')) {
    return coverUrl
  } else {
    return ''
  }
}

/**
 * Calculate epoch time from date and time and time zone.
 *
 * @param {string} date Date example: 2019-06-18
 * @param {string} time Time example: 07:00
 * @param {string} time_zone Time zone example: Europe/Berlin, America/Los_Angeles
 * @returns {string} Unix epoch time example: 1637334000056
 */
export function caleDateTimeWithTimeZone(date: string, time: string, time_zone: string) {
  // initial with provided date
  const providedDate = new Date(
    date + ' ' + (time || '')
  ).getTime()

  // calculate offset from provided time zone
  const timezoneOffset =
    new Date(
      new Date().toLocaleString('en-US', {
        timeZone: time_zone,
      })
    ).getTime() - new Date().getTime()

  // initialize subtracting time zone offset
  return new Date(providedDate - timezoneOffset).getTime()
}