import Image from 'next/image'
import Link from 'next/link'

const Header = ({ titlePre = '' }) => {
  return (
    <div className="flex sticky top-0 z-50 items-center py-1 px-4 h-11 text-sm bg-white">
      <Link href="/" passHref>
        <a className="flex items-center py-1 px-1 hover:bg-gray-200 rounded">
          <Image
            src="/images/maejima.jpg"
            height={20}
            width={20}
            alt="ヘッダー画像"
          />
          <div className="ml-1">
            前島 悠人
          </div>
        </a>
      </Link>
    </div>
  )
}

export default Header
