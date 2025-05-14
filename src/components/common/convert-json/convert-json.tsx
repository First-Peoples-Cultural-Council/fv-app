import SanitizedHtml from './sanitize-html'

export function convertWysiwygToComponent(inputString: string) {
  if (inputString === '') {
    return <></>
  }

  // Check if it is draftJs or HTML
  try {
    const parsedJson = JSON.parse(inputString)

    if (parsedJson['entityMap']) {
      return (
        <>
          {parsedJson.blocks.map(
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
    }
  } catch (error) {
    if (error instanceof SyntaxError && error.message.includes('JSON.parse')) {
      // inputString is HTML instead of DraftJs Json
      return <SanitizedHtml htmlString={inputString}></SanitizedHtml>
    }

    // else log the errors
    console.error(error)
    return <></>
  }
}
