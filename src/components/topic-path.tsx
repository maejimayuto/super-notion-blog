import Link from 'next/link'

const TopicPath = ({ paths = [] }) => {
  return (
    <div className="flex items-center py-1 px-4 h-11 text-sm bg-white">
      <Link href="/" passHref>
        <a className="flex items-center py-1 px-1 hover:bg-gray-200 rounded">
          <div className="ml-1">
            前島 悠人
          </div>
        </a>
      </Link>
      <div className="px-1">/</div>
      <Link href="/blog" passHref>
        <a className="flex items-center py-1 px-1 hover:bg-gray-200 rounded">
          <div className="ml-1">
            {paths[0]}
          </div>
        </a>
      </Link>
      {paths.length == 2 && (
        <>
          <div className="px-1">/</div>
          <Link href="/" passHref>
            <a className="flex items-center py-1 px-1 hover:bg-gray-200 rounded">
              <div className="ml-1">
                {paths[1]}
              </div>
            </a>
          </Link>
        </>
      )}
    </div>
  )
}

export default TopicPath
