import { serve } from '@hono/node-server'
import { serveStatic } from '@hono/node-server/serve-static'
import * as build from '@remix-run/dev/server-build'
import { logDevReady } from '@remix-run/node'
import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { remix } from 'remix-hono/handler'

import { proxy } from './proxy/[...vals]'

const NODE_ENV =
  process.env.NODE_ENV === 'production' ? 'production' : 'development'

const app = new Hono()

app.use('/api/proxy/:org_id/:collection/:instance_id', proxy)

app.use('/*', serveStatic({ root: './public', index: '' }))

app.use('*', logger())

app.use(
  '*',
  remix({
    build,
    mode: NODE_ENV,
    getLoadContext(ctx) {
      return ctx.env
    },
  })
)

// start app, broadcast devReady in dev mode
serve(app, () => {
  if (NODE_ENV === 'development') logDevReady(build)
})
