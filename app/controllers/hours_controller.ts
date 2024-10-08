import DeansOffice from '#models/deans_office'
import type { HttpContext } from '@adonisjs/core/http'

export default class HoursController {
  async index() {
    // Fetch all Dean's Offices along with their workers
    const deansOffices = await DeansOffice.query().preload('workingHours')

    // If you want to extract only the workers from all Dean's Offices
    return deansOffices.flatMap((deanOffice) => deanOffice.workingHours)
  }

  async show({ params }: HttpContext) {
    const deansOffice = await DeansOffice.query()
      .where('id', params.id)
      .preload('workingHours')
      .firstOrFail()

    return deansOffice.workingHours
  }
}
