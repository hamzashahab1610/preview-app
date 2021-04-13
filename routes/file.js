const path = require("path");
const express = require("express");
const File = require("../model/file");
const Router = express.Router();
const FilePreviews = require("filepreviews");
const axios = require("axios");

const fp = new FilePreviews({
	debug: true,
	apiKey: "n9KWYAWJBP4rhFAYPNli6SRNgDwDrx",
	apiSecret: "a7vE80Prz2zUKyflqEJrggx2P1Iiga",
});

const options = {
	pages: "1",
	format: "png",
};

Router.post(
	"/upload",
	(req, res) => {
		const { title, url, thumbnailUrl } = req.body;
		var previewId;
		var config;
		var thumbnail = thumbnailUrl;

		console.log("body", req.body);

		try {
			if (thumbnail === "" || !thumbnail) {
				fp.generate(url, options, function (err, result) {
					if (err) {
						console.log("err", err);
						throw new Error(err);
					}
					console.log("result", result.id);

					previewId = result.id;

					config = {
						method: "get",
						url: `https://api.filepreviews.io/v2/previews/${previewId}`,
						headers: {
							Authorization:
								"Basic bjlLV1lBV0pCUDRyaEZBWVBObGk2U1JOZ0R3RHJ4OmE3dkU4MFByejJ6VUt5ZmxxRUpyZ2d4MlAxSWlnYQ==",
						},
					};

					if (result.id) {
						setTimeout(() => {
							axios(config)
								.then(function (response) {
									console.log("preview response", response);
									thumbnail = response.data.preview.url;
									const file = new File({
										title,
										// description,
										url: url,
										thumbnail: thumbnail,
									});
									file.save();
									res.send("file uploaded successfully.");
								})
								.catch(function (error) {
									console.log("error", error);
									res.status(400).send(error);
								});
						}, 9000);
					}
				});
			} else {
				const file = new File({
					title,
					// description,
					url: url,
					thumbnail: thumbnail,
				});
				file.save();
				res.send("file uploaded successfully.");
			}
		} catch (error) {
			res.status(400).send(
				"Error while uploading file. Try again later.",
			);
		}
	},
	(error, res) => {
		if (error) {
			res.status(500).send(error.message);
		}
	},
);

Router.get("/getAllFiles", async (req, res) => {
	var thumbnail;
	try {
		const files = await File.find({});
		const sortedByCreationDate = files.sort(
			(a, b) => b.createdAt - a.createdAt,
		);

		console.log(sortedByCreationDate);

		// sortedByCreationDate.map((file) => {
		// 	if (!file.thumbnail) {
		// 		fp.generate(file.url, options, function (err, result) {
		// 			if (err) {
		// 				console.log("err", err);
		// 				throw new Error(err);
		// 			}
		// 			console.log("result", result.id);

		// 			previewId = result.id;

		// 			if (result.id) {
		// 				setTimeout(() => {
		// 					config = {
		// 						method: "get",
		// 						url: `https://api.filepreviews.io/v2/previews/${previewId}`,
		// 						headers: {
		// 							Authorization:
		// 								"Basic bjlLV1lBV0pCUDRyaEZBWVBObGk2U1JOZ0R3RHJ4OmE3dkU4MFByejJ6VUt5ZmxxRUpyZ2d4MlAxSWlnYQ==",
		// 						},
		// 					};

		// 					axios(config)
		// 						.then(function (response) {
		// 							thumbnail = response.data.preview.url;
		// 							File.update(
		// 								{ url: file.url },
		// 								{ thumbnail: thumbnail },
		// 							).exec();
		// 							// res.status(200).send(response.data);
		// 						})
		// 						.catch(function (error) {
		// 							res.status(400).send(error);
		// 						});
		// 				}, 5000);
		// 			}
		// 		});
		// 	}
		// });

		res.send(sortedByCreationDate);
	} catch (error) {
		res.status(400).send(
			"Error while getting list of files. Try again later.",
		);
	}
});

Router.get("/download/:id", async (req, res) => {
	try {
		const file = await File.findById(req.params.id);
		res.set({
			"Content-Type": file.file_mimetype,
		});
		res.sendFile(path.join(__dirname, "..", file.file_path));
	} catch (error) {
		res.status(400).send("Error while downloading file. Try again later.");
	}
});

Router.get("/delete/:id", async (req, res) => {
	try {
		await File.deleteOne({ _id: `${req.params.id}` }, function (err, obj) {
			if (err) throw err;
			console.log("1 document deleted");
			res.send("file deleted successfully.");
		});
	} catch (error) {
		res.status(400).send("Error while deleting file. Try again later.");
	}
});

module.exports = Router;
