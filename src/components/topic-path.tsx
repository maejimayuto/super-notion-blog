import Link from 'next/link'

const TopicPath = ({ paths = [], className = "" }) => {
  return (
    <div className={`flex items-center py-1 h-11 bg-white ${className}`}>
      <Link href="/" passHref>
        <a className="flex items-center py-1 px-1 hover:bg-gray-200 rounded">
          前島 悠人
        </a>
      </Link>
      <div className="px-1 text-fg-2">/</div>
      <Link href="/blog" passHref>
        <a className="flex items-center py-1 px-1 hover:bg-gray-200 rounded">
          {paths[0]}
        </a>
      </Link>
      {paths.length == 2 && (
        <>
          <div className="px-1 text-fg-2">/</div>
          <Link href="/" passHref>
            <a className="flex items-center py-1 px-1 hover:bg-gray-200 rounded">
              {paths[1]}
            </a>
          </Link>
        </>
      )}
    </div>
  )
}

export default TopicPath
