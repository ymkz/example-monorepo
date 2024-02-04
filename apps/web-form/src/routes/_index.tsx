import type { MetaFunction } from '@remix-run/node'

export const meta: MetaFunction = () => {
  return [{ title: 'web-form' }]
}

export default function Index() {
  return (
    <div>
      <h1>App</h1>
    </div>
  )
}
