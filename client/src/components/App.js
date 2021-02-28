import React, { useState, useRef } from "react";
import Dropzone from "react-dropzone";
import axios from "axios";
import { Form, Row, Col, Button } from "react-bootstrap";
import { API_URL } from "../utils/constants";
import CloudinaryUploader from "./CloudinaryUploader";

const App = (props) => {
	const [file, setFile] = useState(null); // state for storing actual image
	const [url, setUrl] = useState("");
	const [previewSrc, setPreviewSrc] = useState(""); // state for storing previewImage
	const [state, setState] = useState({
		title: "",
		description: "",
	});
	const [errorMsg, setErrorMsg] = useState("");
	const [isPreviewAvailable, setIsPreviewAvailable] = useState(false); // state to show preview only for images
	const dropRef = useRef(); // React ref for managing the hover state of droppable area

	const handleInputChange = (event) => {
		setState({
			...state,
			[event.target.name]: event.target.value,
		});
	};

	const onDrop = (files) => {
		console.log("files", files);
		const [uploadedFile] = files;
		setFile(uploadedFile);

		const fileReader = new FileReader();
		fileReader.onload = () => {
			setPreviewSrc(fileReader.result);
		};
		fileReader.readAsDataURL(uploadedFile);
		setIsPreviewAvailable(uploadedFile.name.match(/\.(jpeg|jpg|png)$/));
		dropRef.current.style.border = "2px dashed #e9ebeb";
	};

	const updateBorder = (dragState) => {
		if (dragState === "over") {
			dropRef.current.style.border = "2px solid #000";
		} else if (dragState === "leave") {
			dropRef.current.style.border = "2px dashed #e9ebeb";
		}
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		console.log("why are you submitting");

		try {
			const { title, description } = state;
			if (title.trim() !== "" && description.trim() !== "") {
				//const formData = new FormData();
				//formData.append("file", file);
				// formData.append("title", title);
				// formData.append("description", description);
				// formData.append("url", url);

				setErrorMsg("");
				await axios.post(`${API_URL}/upload`, {
					title: title,
					description: description,
					url: url,
				});
				props.history.push("/list");
			} else {
				setErrorMsg("Please enter all the field values.");
			}
		} catch (error) {
			error.response && setErrorMsg(error.response.data);
		}
	};

	return (
		<React.Fragment>
			<CloudinaryUploader setUrl={setUrl} />

			<Form
				className="search-form"
				onSubmit={(e) => handleSubmit(e)}
				style={{ marginTop: "2rem" }}
			>
				{errorMsg && <p className="errorMsg">{errorMsg}</p>}
				<Row>
					<Col>
						<Form.Group controlId="title">
							<Form.Control
								type="text"
								name="title"
								value={state.title || ""}
								placeholder="Enter title"
								onChange={handleInputChange}
							/>
						</Form.Group>
					</Col>
				</Row>
				<Row>
					<Col>
						<Form.Group controlId="description">
							<Form.Control
								type="text"
								name="description"
								value={state.description || ""}
								placeholder="Enter description"
								onChange={handleInputChange}
							/>
						</Form.Group>
					</Col>
				</Row>
				<div className="upload-section">
					{/* <Dropzone
						onDrop={onDrop}
						onDragEnter={() => updateBorder("over")}
						onDragLeave={() => updateBorder("leave")}
					>
						{({ getRootProps, getInputProps }) => (
							<div
								{...getRootProps({ className: "drop-zone" })}
								ref={dropRef}
							>
								<input {...getInputProps()} />
								<p>
									Drag and drop a file OR click here to select
									a file
								</p>
								{file && (
									<div>
										<strong>Selected file:</strong>{" "}
										{file.name}
									</div>
								)}
							</div>
						)}
					</Dropzone> */}
					{/* {previewSrc ? (
						isPreviewAvailable ? (
							<div className="image-preview">
								<img
									className="preview-image"
									src={previewSrc}
									alt="Preview"
								/>
							</div>
						) : (
							<div className="preview-message">
								<p>No preview available for this file</p>
							</div>
						)
					) : (
						<div className="preview-message">
							<p>
								Image preview will be shown here after selection
							</p>
						</div>
					)} */}
				</div>
				<Button variant="primary" type="submit">
					Submit
				</Button>
			</Form>
		</React.Fragment>
	);
};

export default App;
