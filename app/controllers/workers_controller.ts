import DeansOffice from '#models/deans_office'
import type { HttpContext } from '@adonisjs/core/http'

export default class WorkersController {
    async index(){
        // Fetch all Dean's Offices along with their workers
        const deansOffices = await DeansOffice.query().preload('workers')

        // If you want to extract only the workers from all Dean's Offices
        const allWorkers = deansOffices.flatMap((deanOffice) => deanOffice.workers)

        return allWorkers
    }

    async show({ params }: HttpContext){
        const deansOffice = await DeansOffice.query().where('id', params.id).preload('workers').firstOrFail()

        return deansOffice.workers
    }
}