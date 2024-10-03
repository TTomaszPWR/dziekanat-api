/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import DeansOfficesController from '#controllers/deans_offices_controller'
import router from '@adonisjs/core/services/router'

const HoursController = () => import('#controllers/hours_controller')
const WorkersController = () => import('#controllers/workers_controller')

router
  .group(() => {
    router.group(() => {
      router.resource('working_hours', HoursController).apiOnly().params({
        id: 'id',
      })
    })

    router.group(() => {
      router.resource('workers', WorkersController).apiOnly().params({
        id: 'id',
      })
    })

    router.group(() => {
      router.resource('deans_offices', DeansOfficesController).params({
        id: 'id'
      })
    })
  })
  .prefix('api/v1')
