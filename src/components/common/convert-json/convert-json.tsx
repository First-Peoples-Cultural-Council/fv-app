import SanitizedHtml from './sanitize-html'

function isJson(inputString: string): boolean {
  let value = typeof inputString !== 'string' ? JSON.stringify(inputString) : inputString
  try {
    value = JSON.parse(value)
  } catch (err: unknown) {
    console.debug('Invalid Json.', err)
    return false
  }

  return typeof value == 'object' && value !== null
}

export function convertWysiwygToComponent(inputString: string) {
  if (inputString === '') {
    return <></>
  }

  if (isJson(inputString)) {
    const parsedJson = JSON.parse(inputString)
    return (
      <>
        {parsedJson?.blocks?.map(
          (
            block: {
              inlineStyleRanges: any[]
              text: string
              key: string
            },
            index: string
          ) => (
            <p
              key={block.key + index}
              style={{
                fontWeight: block.inlineStyleRanges.some((range) => range.style === 'BOLD') ? 'bold' : 'normal',
              }}
            >
              {block.text}
            </p>
          )
        )}
      </>
    )
  } else {
    return <SanitizedHtml htmlString={inputString}></SanitizedHtml>
  }
}
