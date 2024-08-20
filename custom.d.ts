// To use non-code assets with TypeScript, we need to defer the type for these imports.
// See https://webpack.js.org/guides/typescript/#importing-other-assets

declare module '*.svg' {
  const content: any;
  export default content;
}

declare module '*.module.css' {
  const content: Record<string, string>;
  export default content;
}
