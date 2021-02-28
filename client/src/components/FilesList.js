import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../utils/constants";
import Modal from "react-modal";
import FileView from "./FileViewer";
import fileDownload from "js-file-download";
import FilePreviews from "filepreviews";

const FilesList = () => {
	const [filesList, setFilesList] = useState([]);
	const [errorMsg, setErrorMsg] = useState("");
	const [fileResponse, setFileResponse] = useState();
	const [preview, setPreview] = useState(false);
	const [previewUrl, setpreviewUrl] = useState();
	const [x, setx] = useState({ id: "", title: "", url: "" });
	const [search, setSearch] = useState("");

	const customStyles = {
		content: {
			top: "1%",
			left: "3%",
			width: "95%",
			height: "95vh",
			background: "white",
		},
	};

	console.log("previewUrl", previewUrl);

	const getPreviewUrl = async (url) => {
		console.log("url", url);

		try {
			await axios
				.post(`${API_URL}/previewUrl`, { url: url })
				.then((res) => {
					console.log("res", res);
					setpreviewUrl(res.data.preview.url);
				});
		} catch (error) {
			if (error.response && error.response.status === 400) {
				setErrorMsg("Error while generating preview url");
			}
		}
	};

	const [modalIsOpen, setIsOpen] = React.useState(false);
	function openModal() {
		setIsOpen(true);
	}

	function afterOpenModal() {
		// references are now sync'd and can be accessed.
	}

	function closeModal() {
		setFileResponse();
		setIsOpen(false);
		setPreview(false);
	}

	useEffect(() => {
		const getFilesList = async () => {
			try {
				const { data } = await axios.get(`${API_URL}/getAllFiles`);
				console.log("data", data);
				setErrorMsg("");
				setFilesList(data);
			} catch (error) {
				error.response && setErrorMsg(error.response.data);
			}
		};

		getFilesList();
	}, []);

	const downloadFile = async (title, url) => {
		console.log("url", url);
		axios
			.get(url, {
				responseType: "blob",
			})
			.then((res) => {
				fileDownload(url, title);
			});
	};

	const deleteFile = async (id) => {
		try {
			await axios.get(`${API_URL}/delete/${id}`).then(() => {
				if (typeof window !== "undefined") {
					window.location.reload(true);
				}
			});
		} catch (error) {
			if (error.response && error.response.status === 400) {
				setErrorMsg("Error while deleting file. Try again later");
			}
		}
	};

	const previewFile = async (id, title, url) => {
		setpreviewUrl("");

		setx({ id: id, title: title, url: url });
		setPreview(true);
		try {
			const result = await axios.get(`${API_URL}/download/${id}`, {
				responseType: "blob",
			});
			setFileResponse(result);
		} catch (error) {
			if (error.response && error.response.status === 400) {
				setErrorMsg("Error while previewing file. Try again later");
			}
		}
	};

	// const previewer = (type) => {
	// 	if (type.includes("sheet") || type.includes("excel")) {
	// 		console.log("excellll");
	// 		return <FileView type={"xlsx"} url={fileResponse.config.url} />;
	// 	} else if (type.includes("doc")) {
	// 		console.log("docccc");
	// 		return <FileView type={"docx"} url={fileResponse.config.url} />;
	// 	} else {
	// 		console.log("otherrrr");
	// 		return (
	// 			<object
	// 				width="100%"
	// 				height="100%"
	// 				data={fileResponse.config.url}
	// 			>
	// 				<param name="src" value={fileResponse.config.url} />
	// 				<param name="readonly" value="false" />
	// 			</object>
	// 		);
	// 	}
	// };

	return (
		<div className="files-container">
			<Modal
				isOpen={modalIsOpen}
				onAfterOpen={afterOpenModal}
				onRequestClose={closeModal}
				style={customStyles}
				contentLabel="Example Modal"
			>
				<a
					style={{
						float: "right",
						padding: "0.5rem 1rem",
						marginBottom: "1rem",
					}}
					href={x.url}
					download
					//onClick={() => downloadFile(x.title, x.url)}
				>
					Download
				</a>

				{/* <iframe
					src={previewUrl}
					scrolling="no"
					style={{
						overflow: "hidden",
						width: "100%",
						height: "95%",
					}}
				></iframe> */}

				<img src={previewUrl} alt="" />
			</Modal>
			<div style={{ marginBottom: "1rem" }}>
				<label style={{ marginRight: "1rem", fontWeight: "bold" }}>
					Search
				</label>
				<input
					style={{ paddingLeft: "0.5rem" }}
					type="text"
					onChange={(e) =>
						setSearch(e.target.value.toLocaleLowerCase())
					}
				/>
			</div>

			{!preview ? (
				<>
					{errorMsg && <p className="errorMsg">{errorMsg}</p>}
					<table className="files-table">
						<thead>
							<tr>
								<th>Title</th>
								<th>Description</th>
								<th>File Name</th>
								<th>Delete File</th>
								<th>Download File</th>
							</tr>
						</thead>
						<tbody>
							{filesList.length > 0 ? (
								filesList.map(
									({ url, _id, title, description }) => {
										if (
											title.toLowerCase().search(search) >
												-1 ||
											description
												.toLowerCase()
												.search(search) > -1
										) {
											return (
												<tr key={_id}>
													<td className="file-title">
														{title}
													</td>
													<td className="file-description">
														<a
															href="#/"
															onClick={() => {
																previewFile(
																	_id,
																	title,
																	url,
																);
																getPreviewUrl(
																	url,
																);

																openModal();
															}}
														>
															{description}
														</a>
													</td>
													<td className="file-title">
														{title}
													</td>
													<td>
														<a
															href="#/"
															onClick={() =>
																deleteFile(_id)
															}
														>
															Delete
														</a>
													</td>
													<td>
														<a
															href={url}
															download
															// onClick={() =>
															// 	downloadFile(
															// 		title,
															// 		url,
															// 	)
															// }
														>
															Download
														</a>
													</td>
												</tr>
											);
										}
									},
								)
							) : (
								<tr>
									<td
										colSpan={5}
										style={{ fontWeight: "300" }}
									>
										No files found. Please add some.
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</>
			) : null}
		</div>
	);
};

export default FilesList;
