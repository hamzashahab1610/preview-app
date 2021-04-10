const mongoose = require("mongoose");

const fileSchema = mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			trim: true,
		},
		// description: {
		// 	type: String,
		// 	required: true,
		// 	trim: true,
		// },
		url: {
			type: String,
			required: true,
		},
		thumbnail: {
			type: String,
		},
	},
	{
		timestamps: true,
	},
);

const File = mongoose.model("File", fileSchema);

module.exports = File;
