exports.up = function(knex) {
    return knex.schema.createTable('cars', table =>{
        table.increments();
        table.string('make', 128).notNullable();
        table.string('model', 128).notNullable();
        table.string('vin', 64).notNullable();
        table.integer('mileage', 32).notNullable();
        table.string('transmission', 64);
        table.string('status', 64);

        table.timestamps();
    });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('cars');
};