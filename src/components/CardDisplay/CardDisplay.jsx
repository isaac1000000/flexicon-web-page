import './CardDisplay.css';

function CardDisplay ( { id, word, definition } ) {

	return (
		<div className="card-display">
			<p className="word">{word}</p>
			<div className="horizontal-line"></div>
			<p className="definition">{definition}</p>
		</div>
	)
};

export default CardDisplay;