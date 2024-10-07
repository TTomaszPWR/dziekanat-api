/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import AutoSwagger from 'adonis-autoswagger'
import swagger from '#config/swagger'
const HoursController = () => import('#controllers/hours_controller')
const WorkersController = () => import('#controllers/workers_controller')
const DeansOfficesController = () => import('#controllers/deans_offices_controller')

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
        id: 'id',
      })
    })
  })
  .prefix('api/v1')

// returns swagger in YAML
router.get('/swagger', async () => {
  return AutoSwagger.default.docs(router.toJSON(), swagger)
})

// Renders Swagger-UI and passes YAML-output of /swagger
router.get('/docs', async () => {
  return AutoSwagger.default.ui('/swagger', swagger)
})
