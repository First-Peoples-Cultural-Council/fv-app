/* eslint-disable-next-line */
export interface AboutViewProps {}

export function AboutView(props: AboutViewProps) {
  return (
    <div className="p-4">
      <h1 className="text-3xl">About this App</h1>
      <br />
      <h1 className="text-xl">
          This app is called <span className="text-color-secondary-0">{process.env.REACT_APP_ABOUT_APP_NAME}</span> and is provided by <span className="text-color-secondary-0">{process.env.REACT_APP_ABOUT_ORG_NAME}</span>
      </h1>
      <br />
      <h1 className="text-xl">
          The current version of this app is {process.env.REACT_APP_VERSION_NUMBER}
      </h1>
      <br />
      <h1 className="text-xl">
          {process.env.REACT_APP_ABOUT_ADDITIONAL_INFO}
      </h1>
    </div>
  );
}

export default AboutView;
