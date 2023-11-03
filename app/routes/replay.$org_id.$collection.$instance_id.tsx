import {
  json,
  type LoaderFunctionArgs,
  type MetaFunction,
} from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' },
  ]
}

export function loader({ request, params }: LoaderFunctionArgs) {
  const url = new URL(request.url).search

  const { org_id, collection, instance_id } = params

  const iframeUrl = `/api/proxy/${org_id}/${collection}/${instance_id}?url=${url}`
  return json({ iframeUrl })
}

export default function Index() {
  const { iframeUrl } = useLoaderData<typeof loader>()
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.8' }}>
      <h1>Replay</h1>

      <iframe
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          position: 'absolute',
        }}
        title='replay-iframe'
        src={iframeUrl}
      ></iframe>
    </div>
  )
}
