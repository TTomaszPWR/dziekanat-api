import factory from '@adonisjs/lucid/factories'
import Worker from '#models/worker'
import DeansOffice from '#models/deans_office'

export const WorkerFactory = factory
  .define(Worker, async ({ faker }) => {
    const deansOffice = await DeansOffice.query().select('id').orderByRaw('random()').firstOrFail()

    return {
      name: faker.person.fullName(),
      phoneNumber: faker.phone.number(),
      deansOfficeId: deansOffice.id,
      email: faker.internet.email(),
    }
  })
  .build()