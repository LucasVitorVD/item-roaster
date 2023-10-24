import Fastify from 'fastify'

const fastify = Fastify({
  logger: true
})

fastify.get('/health', async () => {
  return { hello: 'world' }
})

async function main() {
  fastify.listen({ port: 3000 }, (err) => {
    if (err) {
      fastify.log.error(err)
      process.exit(1)
    }
  })
}

main()