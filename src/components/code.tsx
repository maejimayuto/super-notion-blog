import Prism from 'prismjs'
import 'prismjs/components/prism-jsx'

const Code = ({ children, language = 'javascript' }) => {
  return (
    <>
      <pre>
        <code
          dangerouslySetInnerHTML={{
            __html: Prism.highlight(
              children,
              Prism.languages[language.toLowerCase()] ||
                Prism.languages.javascript
            ),
          }}
        />
      </pre>

      <style jsx>{`
        pre {
          tab-size: 2;
        }

        code {
          overflow: auto;
          display: block;
          padding: 2.1rem 1.9rem;
          margin: 0.5rem 0;
          line-height: 1.5;
          background: rgb(247, 246, 243);
          font-size: 0.8rem;
          border-radius: 0.25rem;
        }
      `}</style>
    </>
  )
}

export default Code
