import type { HttpContext } from '@adonisjs/core/http'

export default class HoursController {
    async index({ request }: HttpContext){
        // returns all working hours from all deans_offices
        return 0
    }

    async show({ request }: HttpContext){
        // returns all working hours from particular deans_office
        return 0
    }
}