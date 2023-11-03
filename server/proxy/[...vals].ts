import type { Context } from 'hono'

export async function proxy(ctx: Context<Record<string, never>>) {
  console.log(`Proxying incoming request to ${ctx.req.url}`)

  return new Response(`Proxying incoming request to ${ctx.req.url}`)
}
