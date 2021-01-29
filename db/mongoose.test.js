const mongoose = require("mongoose");

let db = mongoose.connection;
setTimeout(() => {
	mongoose
		.connect("mongodb://localhost:27017/myapp", {
			useNewUrlParser: true,
			useCreateIndex: true,
			useUnifiedTopology: true,
		})
		.catch((error) => {
			console.log("unable to connect database");
		});
	// let db = mongoose.connection;
	db.on("connecting", function () {
		console.log("connecting to MongoDB...");
	});

	db.on("error", function (error) {
		console.error("Error in MongoDb connection: " + error);
		mongoose.disconnect();
	});
	db.on("connected", function () {
		console.log("MongoDB connected!");
		// console.log(process.env.MONGODB_URL);
	});
	db.once("open", function () {
		mongoose.connection.db.dropCollection("urls", function (err, result) {
			if (!err) {
				console.log("collection has reset");
			}
		});
		console.log("MongoDB connection opened!");
	});
}, 15000);

test("test connection", async () => {
	jest.setTimeout(8000);

	// console.log(Object.keys(db))
	// console.log(db)
	expect(db).toBeTruthy();
});
