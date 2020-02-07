# Run With Nodemon
	nodemon start
# Running Migrate
	npx sequelize-cli db:migrate
# Running Seeder
	npx sequelize-cli db:seed:all
# Generate Migration
	npx sequelize-cli model:generate --name Table --attributes field1:string,field2:string