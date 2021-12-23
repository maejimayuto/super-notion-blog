import { values } from './rpc'
import Slugger from 'github-slugger'
import queryCollection from './queryCollection'
import { caleDateTimeWithTimeZone, getCoverUrl, normalizeSlug } from '../blog-helpers'

export async function getTableData(collectionBlock: any, isPosts = false) {
  const slugger = new Slugger()

  const { value } = collectionBlock
  let table: any = {}
  const col = await queryCollection({
    collectionId: value.collection_id,
    collectionViewId: value.view_ids[0],
  })
  const entries = values(col.recordMap.block).filter((block: any) => {
    return block.value && block.value.parent_id === value.collection_id
  })

  const colId = Object.keys(col.recordMap.collection)[0]
  const schema = col.recordMap.collection[colId].value.schema
  const schemaKeys = Object.keys(schema)

  for (const entry of entries) {
    const props = entry.value && entry.value.properties
    const row: any = {}

    if (!props) continue
    if (entry.value.content) {
      row.id = entry.value.id
    }

    schemaKeys.forEach(key => {
      // might be undefined
      let val = props[key] && props[key][0][0]

      // authors and blocks are centralized
      if (val && props[key][0][1]) {
        const type = props[key][0][1][0]

        switch (type[0]) {
          case 'a': // link
            val = type[1]
            break
          case 'u': // user
            val = props[key]
              .filter((arr: any[]) => arr.length > 1)
              .map((arr: any[]) => arr[1][0][1])
            break
          case 'p': // page (block)
            const page = col.recordMap.block[type[1]]
            row.id = page.value.id
            val = page.value.properties.title[0][0]
            break
          case 'd': // date
            val = caleDateTimeWithTimeZone(type[1].start_date, type[1].start_time, type[1].time_zone)
            break
          default:
            console.error('unknown type', type[0], type)
            break
        }
      }

      if (typeof val === 'string') {
        val = val.trim()
      }
      row[schema[key].name] = val || null
    })

    row['PageIcon'] = entry.value.format?.page_icon ? entry.value.format.page_icon : ''
    row['PageCoverUrl'] = getCoverUrl(entry.value.format?.page_cover)

    // auto-generate slug from title
    row.Slug = normalizeSlug(row.Slug || slugger.slug(row.Page || ''))

    const key = row.Slug
    if (isPosts && !key) continue

    if (key) {
      table[key] = row
    } else {
      if (!Array.isArray(table)) table = []
      table.push(row)
    }
  }
  return table
}
