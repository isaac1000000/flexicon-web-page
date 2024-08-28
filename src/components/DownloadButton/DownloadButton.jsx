import './DownloadButton.css';

function DownloadButton ( { id, label="Download", locked=false, onClick } ) {



	return (
		<div className="download-button">
			<button 
				onClick={onClick}
				type="button"
				disabled={locked}>
				{label}
			</button>
		</div>
	)
};

export default DownloadButton;