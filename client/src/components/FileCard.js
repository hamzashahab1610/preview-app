import React, { useState } from "react";
import "../styles.scss";
import axios from "axios";
import { API_URL } from "../utils/constants";
import Modal from "react-modal";

function FileCard({ img, title, url, id }) {
	const [errorMsg, setErrorMsg] = useState("");
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
				) : url.includes("doc") ||
				  url.includes("docx") ||
				  url.includes("xls") ||
				  url.includes("xlsx") ||
				  url.includes("ppt") ||
				  url.includes("pptx") ? (
					<iframe
						src={`https://view.officeapps.live.com/op/embed.aspx?src=${url}`}
						width="100%"
						height="100%"
						frameborder="0"
					></iframe>
				) : (
					<iframe
						width="100%"
						height="100%"
						frameborder="0"
						src={url}
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
					<img className="file-card-img" src={img} alt="" />
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
