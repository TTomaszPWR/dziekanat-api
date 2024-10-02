import DeansOffice from '#models/deans_office'
import type { HttpContext } from '@adonisjs/core/http'

export default class DeansOfficesController {
    async index(){
        return await DeansOffice.all();
    }

    async show({ params }: HttpContext){
        return await DeansOffice.query().where('id', params.id)
    }
}