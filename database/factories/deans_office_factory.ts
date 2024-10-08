import DeansOffice from '#models/deans_office'
import factory from '@adonisjs/lucid/factories'

export const DeansOfficeFactory = factory
  .define(DeansOffice, async ({ faker }) => {
    return {
      id: faker.number.int({ min: 1, max: 100000 }),
      name: faker.company.name(),
    }
  })
  .build()
