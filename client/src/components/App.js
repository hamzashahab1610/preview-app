import React, { useState } from "react";
import axios from "axios";
import { Form, Row, Col, Button } from "react-bootstrap";
import { API_URL } from "../utils/constants";
import CloudinaryUploader from "./CloudinaryUploader";

const App = (props) => {
	const [url, setUrl] = useState("");
	const [title, setTitle] = useState("");
	const [thumbnailUrl, setThumbnailUrl] = useState("");
	// const [state, setState] = useState({
	// 	title: "",
	// 	 description: "",
	// });
	const [errorMsg, setErrorMsg] = useState("");

	// const handleInputChange = (event) => {
	// 	setState({
	// 		...state,
	// 		[event.target.name]: event.target.value,
	// 	});
	// };

	const handleSubmit = async (event) => {
		event.preventDefault();

		// const { title, description } = state;
		// if (title.trim() !== "" && description.trim() !== "") {
		// 	setErrorMsg("");
		await axios.post(`${API_URL}/upload`, {
			title: title,
			// description: description,
			url: url,
			thumbnailUrl: thumbnailUrl,
		});
		props.history.push("/list");
		// } else {
		// 	setErrorMsg("Please enter all the field values.");
		// }
	};

	return (
		<React.Fragment>
			<div style={{ display: "flex", alignItems: "center" }}>
				<CloudinaryUploader
					setUrl={setUrl}
					setTitle={setTitle}
					setThumbnailUrl={setThumbnailUrl}
				/>
				<span style={{ marginLeft: "2rem" }}>{title}</span>
			</div>

			<Form
				className="search-form"
				onSubmit={(e) => handleSubmit(e)}
				style={{ marginTop: "1rem" }}
			>
				{/* {errorMsg && <p className="errorMsg">{errorMsg}</p>} */}
				{/* <Row>
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
				</Row> */}
				{/* <Row>
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
				</Row> */}
				<div className="upload-section"></div>
				<Button variant="primary" type="submit">
					Submit
				</Button>
			</Form>
		</React.Fragment>
	);
};

export default App;
