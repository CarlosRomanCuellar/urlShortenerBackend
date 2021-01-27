const mongoose = require("mongoose");

setTimeout(() => {
	mongoose.connect('mongodb://localhost:27017/myapp', {
			useNewUrlParser: true,
			useCreateIndex: true,
			useUnifiedTopology: true,
		}).catch((error) => {
			console.log("unable to connect database");
		});
	let db = mongoose.connection;
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
		mongoose.connection.db.dropCollection("urls",function(err,result){ 
			if(!err){
				console.log("collection has reset")
			}
		})
		console.log("MongoDB connection opened!");
	});
	db.on("reconnected", function () {
		console.log("MongoDB reconnected!");
	});
	db.on("disconnected", function () {
		db.close();
		console.log("MongoDB disconnected!");

		setTimeout(() => {
			mongoose.connect('mongodb://localhost:27017/myapp', {
					useNewUrlParser: true,
					useCreateIndex: true,
					useUnifiedTopology: true,
				})
				.catch((err) => console.log("unable to reconect"));
		}, 5000);
	});
},15000);
