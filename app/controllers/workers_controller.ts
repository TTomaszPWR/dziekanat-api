import type { HttpContext } from '@adonisjs/core/http'

export default class WorkersController {
    async index({ request }: HttpContext){
        // returns all workers from all deans_offices
        return 0
    }

    async show({ request }: HttpContext){
        // returns all workers from particular deans_office
        return 0
    }
}