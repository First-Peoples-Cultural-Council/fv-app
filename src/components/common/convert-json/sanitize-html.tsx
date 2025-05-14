import PropTypes from 'prop-types'
import DOMPurify from 'dompurify'

DOMPurify.addHook('uponSanitizeElement' as any, (node: Element, data: any) => {
  if (data.tagName === 'iframe') {
    const src = node.getAttribute('src') ?? ''
    if (!RegExp(/youtube.com|youtube-nocookie.com/).exec(src)) {
      return node.parentNode?.removeChild(node)
    }
  }
})

const Sanitize = (content = '') =>
  DOMPurify.sanitize(content, {
    ADD_TAGS: ['iframe'],
    ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling'],
  })

export function SanitizedHtml({ htmlString = '', className = '' }) {
  return <div className={className} dangerouslySetInnerHTML={{ __html: Sanitize(htmlString) }} />
}

const { string } = PropTypes
SanitizedHtml.propTypes = {
  htmlString: string,
  className: string,
}

export default SanitizedHtml
