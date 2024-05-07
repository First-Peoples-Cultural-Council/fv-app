export function convertJsonToComponent(jsonString: string) {
    if (jsonString === '') {
      return <></>;
    }

    try {
      const json = JSON.parse(jsonString);

      return (
        <>
          {json.blocks.map(
            (block: {
              inlineStyleRanges: any[];
              text: string;
              key: string;
            }) => (
              <p
                key={block.key}
                style={{
                  fontWeight: block.inlineStyleRanges.some(
                    (range) => range.style === 'BOLD'
                  )
                    ? 'bold'
                    : 'normal',
                }}
              >
                {block.text}
              </p>
            )
          )}
        </>
      );
    } catch (error) {
      console.error(error);
      return <></>;
    }
  }
