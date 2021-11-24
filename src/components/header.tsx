import Image from 'next/image'

const Header = ({ titlePre = '' }) => {
  return (
    <div className="sticky top-0 z-50 flex bg-white shadow py-1 px-4 h-11 items-center">
      <Image
        src="/images/maejima.jpg"
        height={20}
        width={20}
        alt="ヘッダー画像"
      />
      <div className="ml-1">
        前島 悠人
      </div>
    </div>
  )
}

export default Header
