import React from "react";

function Iframe({ url, setPreview }) {
	return (
		<div className="iframe-container">
			<div className="iframe">
				<iframe
					title="iframe"
					src={url}
					frameborder="0"
					width="700px"
					height="800px"
				/>
			</div>
		</div>
	);
}

export default Iframe;
