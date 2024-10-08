import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'working_hours'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table
        .integer('deans_office_id')
        .references('deans_offices.id')
        .onDelete('CASCADE')
        .notNullable()

      table
        .text('day_of_week')
        .notNullable()
      table.primary(['deans_office_id', 'day_of_week'])

      table.time('open_hour')
      table.time('close_hour')

      table.timestamp('created_at').defaultTo(this.now())
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
