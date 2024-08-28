import { Component } from 'react';
import PropTypes from 'prop-types';
import './GenerateButton.css';

class GenerateButton extends Component {

	static propTypes = {
		id: PropTypes.string.isRequired,
		label: PropTypes.string,
		onClick: PropTypes.func,
	};

	static defaultProps = {
		label: 'Generate',
		onClick: () => '',
	};

	constructor(props) {
		super(props);

		this.state = {
			label: props.label,
		}
	};

	render() {
		const { label } = this.state;
		const { id, onClick } = this.props;

		return (
			<div className="generate-button">
				<button 
					onClick={this.props.onClick}
					type="button">
					{label}
				</button>
			</div>
		)
	};
}

export default GenerateButton;