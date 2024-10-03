import factory from '@adonisjs/lucid/factories'
import WorkingHour from '#models/working_hour'
//import DeansOffice from '#models/deans_office'

export const WorkingHourFactory = factory
  .define(WorkingHour, async ({ faker }) => {
    //const deansOffice = await DeansOffice.query().select('id').orderByRaw('random()').firstOrFail()

    return {
      deansOfficeId: 2984,
      dayOfWeek: faker.helpers.arrayElement(['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']),
      openHour: faker.number.int({ min: 7, max: 11 }).toString() + ':00',
      closeHour: faker.number.int({ min: 13, max: 17 }).toString() + ':00' ,
    }
  })
  .build()