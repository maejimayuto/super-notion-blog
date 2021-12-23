import Image from 'next/image'
import Link from 'next/link'

const Header = ({ titlePre = '' }) => {
  return (
    <div className="flex sticky top-0 z-50 items-center py-1 px-4 h-11 text-sm bg-white shadow-sm md:shadow-none">
      <Link href="/" passHref>
        <a className="flex items-center py-1 px-1 font-normal text-fg hover:text-fg hover:bg-fg-0 rounded border-0">
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
