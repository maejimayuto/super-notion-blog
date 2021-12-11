const Bookmark = ({ link, title, description, format }) => {
  const { bookmark_icon: icon, bookmark_cover: cover } = format
  return (
    <>
      <div className="bookmark">
        <div>
          <div style={{ display: 'flex' }}>
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="bookmarkContentsWrapper"
              href={link}
            >
              <div
                role="button"
                className="bookmarkContents"
              >
                <div className="bookmarkInfo">
                  <div className="bookmarkTitle">
                    {title}
                  </div>
                  <div className="bookmarkDescription">
                    {description}
                  </div>
                  <div className="bookmarkLinkWrapper">
                    <img
                      src={icon}
                      className="bookmarkLinkIcon"
                    />
                    <div className="bookmarkLink">
                      {link}
                    </div>
                  </div>
                </div>
                <div className="bookmarkCoverWrapper1">
                  <div className="bookmarkCoverWrapper2">
                    <div className="bookmarkCoverWrapper3">
                      <img
                        src={cover}
                        className="bookmarkCover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* TODO: change to tailwind */}
      <style jsx>{`
        .bookmark {
          width: 100%;
          max-width: 100%;
          margin-top: 8px;
          margin-bottom: 8px;
          background-color: var(--bg);
        }

        .bookmark img {
          box-shadow: none;
          margin: 0;
          padding: 0;
        }

        .bookmarkContentsWrapper {
          display: block;
          color: inherit;
          text-decoration: none;
          flex-grow: 1;
          min-width: 0px;
        }

        .bookmarkContents {
          user-select: none;
          cursor: pointer;
          width: 100%;
          display: flex;
          flex-wrap: wrap-reverse;
          align-items: stretch;
          text-align: left;
          overflow: hidden;
          border: 1px solid #cacaca;
          border-radius: 3px;
          position: relative;
          color: inherit;
          fill: inherit;
        }

        .bookmarkInfo {
          flex: 4 1 180px;
          padding: 12px 14px 14px;
          overflow: hidden;
          text-align: left;
        }

        .bookmarkTitle {
          font-size: 14px;
          line-height: 20px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          min-height: 24px;
          margin-bottom: 2px;
        }

        .bookmarkDescription {
          font-size: 12px;
          line-height: 16px;
          height: 32px;
          overflow: hidden;
        }

        .bookmarkLinkWrapper {
          display: flex;
          margin-top: 6px;
        }

        .bookmarkLinkIcon {
          width: 16px;
          height: 16px;
          min-width: 16px;
        }

        .bookmarkLink {
          font-size: 12px;
          line-height: 16px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          margin-left: 6px;
        }

        .bookmarkCoverWrapper1 {
          flex: 1 1 180px;
          display: block;
          position: relative;
        }

        .bookmarkCoverWrapper2 {
          position: absolute;
          top: 0px;
          left: 0px;
          right: 0px;
          bottom: 0px;
          padding: 0;
          background-color: #ff0000;
        }

        .bookmarkCoverWrapper3 {
          width: 100%;
          height: 100%;
          padding: 0;
          margin: 0;
        }

        .bookmarkCover {
          display: block;
          object-fit: cover;
          border-radius: 1px;
          width: 100%;
          height: 100%;
        }
      `}</style>
    </>
  )
}

export default Bookmark
