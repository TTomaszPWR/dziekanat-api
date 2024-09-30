/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

const HoursController = () => import('#controllers/hours_controller')
const WorkersController = () => import('#controllers/workers_controller')

router.group(() => {
  router.group(() => {
    router.resource('hours', HoursController)
      .apiOnly()
      .params({
        hours: 'id'
      })
  })
  
  router.group(() => {
    router.resource('workers', WorkersController)
      .apiOnly()
      .params({
        workers: 'id'
      })
  })
}).prefix('api/v1')