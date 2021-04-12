import React, { useState } from "react";
import "../styles.scss";
import axios from "axios";
import { API_URL } from "../utils/constants";
import Modal from "react-modal";
import Excel from "../assets/excel.png";
import PDF from "../assets/pdf.png";
import Word from "../assets/word.png";
import Text from "../assets/txt.png";
import JSON from "../assets/json.png";
import PNG from "../assets/pic.png";
import JPG from "../assets/jpg.png";
import PPT from "../assets/ppt.png";
import XML from "../assets/xml.png";
import PY from "../assets/py.png";
import JAVA from "../assets/java.png";
import FilePreviewer from "react-file-previewer";

function FileCard({ img, title, url, id }) {
	const [errorMsg, setErrorMsg] = useState("");
	const [previewUrl, setPreviewUrl] = useState(
		`https://docs.google.com/viewer?embedded=true&url=${url}`,
	);
	const [modalIsOpen, setIsOpen] = React.useState(false);

	function openModal() {
		setIsOpen(true);
	}

	function closeModal() {
		setIsOpen(false);
	}

	const customStyles = {
		content: {
			top: "3%",
			left: "2%",
			width: "95%",
			height: "95vh",
			background: "white",
			overflow: "hidden",
		},
	};

	const downloadFile = async (title, url) => {
		window.location.href = url;
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

	return (
		<>
			<Modal
				isOpen={modalIsOpen}
				onRequestClose={closeModal}
				style={customStyles}
				contentLabel="Example Modal"
			>
				{url.includes("png") ||
				url.includes("svg") ||
				url.includes("jpeg") ||
				url.includes("jpg") ? (
					<img src={url} width="100%" height="100%" frameborder="0" />
				) : (
					<iframe
						src={previewUrl}
						width="100%"
						height="100%"
						frameborder="0"
					></iframe>
				)}

				{/* <button
					onClick={() => downloadFile(title, url)}
					style={{
						float: "right",
						padding: "0.5rem 1rem",
						marginBottom: "1rem",
					}}
				>
					Download
				</button> */}
			</Modal>
			<div className="file-card-container">
				<div className="img-container" onClick={openModal}>
					{url.includes("py") ||
					url.includes("java") ||
					url.includes("json") ||
					url.includes("xml") ? (
						<img className="other-files" src={img} alt="" />
					) : (
						<img className="file-card-img" src={img} alt="" />
					)}
				</div>
				<div className="logo">
					{url.includes("pdf") ? (
						<img src={PDF} alt="" width="30px" />
					) : url.includes("xls") || url.includes("csv") ? (
						<img src={Excel} alt="" width="30px" />
					) : url.includes("doc") || url.includes("docx") ? (
						<img src={Word} alt="" width="30px" />
					) : url.includes("txt") ? (
						<img src={Text} alt="" width="30px" />
					) : url.includes("json") ? (
						<img src={JSON} alt="" width="30px" />
					) : url.includes("png") ? (
						<img src={PNG} alt="" width="30px" />
					) : url.includes("jpg") || url.includes("jpeg") ? (
						<img src={JPG} alt="" width="30px" />
					) : url.includes("ppt") ? (
						<img src={PPT} alt="" width="30px" />
					) : url.includes("xml") ? (
						<img src={XML} alt="" width="30px" />
					) : url.includes("py") ? (
						<img src={PY} alt="" width="30px" />
					) : url.includes("java") ? (
						<img src={JAVA} alt="" width="30px" />
					) : (
						<img src="" alt="" width="30px" />
					)}
				</div>

				<hr />
				<div className="file-card-bottom">
					<div style={{ width: "50%" }}>{title}</div>
					<div>
						<button onClick={() => downloadFile(title, url)}>
							Download
						</button>
						<button
							onClick={() => deleteFile(id)}
							style={{ marginLeft: "10px" }}
						>
							Delete
						</button>
					</div>
				</div>
			</div>
		</>
	);
}

export default FileCard;
