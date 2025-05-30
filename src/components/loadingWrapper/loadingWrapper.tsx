import { LoadingSpinner } from 'components/common/loading-spinner/loading-spinner'
import { useAsyncData } from 'util/useAsyncData'

type LoadingWrapperProps<T> = {
  fetchData: () => Promise<T>
  children: (data: T) => React.ReactNode
  fallback?: React.ReactNode
}

export function LoadingWrapper<T>({
  fetchData,
  children,
  fallback = <LoadingSpinner />,
}: Readonly<LoadingWrapperProps<T>>) {
  const { data, loading, error } = useAsyncData(fetchData)

  if (loading) return fallback
  if (error) {
    console.error(error)
    return <></>
  }

  return <>{data && children(data)}</>
}
