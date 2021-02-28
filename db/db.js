const mongoose = require("mongoose");

mongoose
	.connect(
		"mongodb+srv://hamzashahab1610:Charizard.2000@my-cluster.3y4if.mongodb.net/files?retryWrites=true&w=majority",
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
		},
	)
	.then(() => {
		console.log("Connected to database");
	})
	.catch((error) => console.log("error", error));

// mongoose.connect('mongodb://127.0.0.1:27017/file_upload', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useCreateIndex: true
// });
