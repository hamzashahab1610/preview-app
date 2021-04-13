import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../utils/constants";
import FileCard from "./FileCard";

const FilesList = () => {
	const [filesList, setFilesList] = useState([]);
	const [errorMsg, setErrorMsg] = useState("");
	const [search, setSearch] = useState("");

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

	return (
		<div className="files-container">
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
			<div
				style={{
					display: "grid",
					gridTemplateColumns: "repeat(4,1fr)",
					gridGap: "1.5rem",
				}}
			>
				{filesList.map((file) => {
					if (file.title.toLowerCase().search(search) > -1)
						return (
							<FileCard
								url={file.url}
								img={file.thumbnail}
								title={file.title}
								id={file._id}
							/>
						);
				})}
			</div>
		</div>
	);
};

export default FilesList;
