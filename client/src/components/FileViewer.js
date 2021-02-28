import React from "react";
import FileViewer from "react-file-viewer";

function FileView({ type, url }) {
	return <FileViewer fileType={type} filePath={url} />;
}

export default FileView;
