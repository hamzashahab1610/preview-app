const path = require("path");
const express = require("express");
const multer = require("multer");
const File = require("../model/file");
const Router = express.Router();
const FilePreviews = require("filepreviews");
const { Route } = require("react-router-dom");
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

const upload = multer({
	storage: multer.diskStorage({
		destination(req, file, cb) {
			cb(null, "./files");
		},
		filename(req, file, cb) {
			cb(null, `${new Date().getTime()}_${file.originalname}`);
		},
	}),
	limits: {
		fileSize: 1000000, // max file size 1MB = 1000000 bytes
	},
	fileFilter(req, file, cb) {
		if (
			!file.originalname.match(
				/\.(jpeg|jpg|png|pdf|doc|docx|xlsx|xls|txt|json|csv|xml|html|ppt|pptx|py|php|css|rb|cs)$/,
			)
		) {
			return cb(
				new Error(
					"only upload files with jpg, jpeg, png, pdf, doc, docx, xslx, xls, json, txt, csv, xml, html, ppt, pptx format.",
				),
			);
		}
		cb(undefined, true); // continue with upload
	},
});

Router.post(
	"/upload",
	(req, res) => {
		console.log("req", req.body);
		try {
			const { title, description, url } = req.body;

			//const { path, mimetype } = req.file;
			const file = new File({
				title,
				description,
				//file_path: path,
				//file_mimetype: mimetype,
				url: url,
			});
			file.save();
			res.send("file uploaded successfully.");
		} catch (error) {
			res.status(400).send(
				"Error while uploading file. Try again later.",
			);
		}
	},
	(error, req, res, next) => {
		if (error) {
			res.status(500).send(error.message);
		}
	},
);

Router.post("/previewUrl", (req, res) => {
	const { url } = req.body;
	console.log("url", url);
	var previewId;
	var config;

	fp.generate(url, options, function (err, result) {
		if (err) {
			console.log("err", err);
			throw new Error(err);
		}
		console.log("result", result.id);

		previewId = result.id;

		if (result.id) {
			setTimeout(() => {
				config = {
					method: "get",
					url: `https://api.filepreviews.io/v2/previews/${previewId}`,
					headers: {
						Authorization:
							"Basic bjlLV1lBV0pCUDRyaEZBWVBObGk2U1JOZ0R3RHJ4OmE3dkU4MFByejJ6VUt5ZmxxRUpyZ2d4MlAxSWlnYQ==",
					},
				};

				console.log("config", config);

				axios(config)
					.then(function (response) {
						console.log("Heloooooooo", response.data);
						res.status(200).send(response.data);
					})
					.catch(function (error) {
						res.status(400).send(error);
					});
			}, 2000);
		}
	});
});

Router.get("/getAllFiles", async (req, res) => {
	try {
		const files = await File.find({});
		const sortedByCreationDate = files.sort(
			(a, b) => b.createdAt - a.createdAt,
		);
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
