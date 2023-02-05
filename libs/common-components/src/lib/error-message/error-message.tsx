export interface ErrorMessageProps {
  message: string | undefined;
  test: boolean;
}

export function ErrorMessage({ message, test }: ErrorMessageProps) {
  return test ? <span className="text-xs text-red-700">{message}</span> : null;
}

export default ErrorMessage;
