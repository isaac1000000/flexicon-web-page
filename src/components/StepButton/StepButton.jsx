import { Component } from 'react';
import PropTypes from 'prop-types';
import './StepButton.css';

class StepButton extends Component {

	static propTypes = {
		id: PropTypes.string.isRequired,
		label: PropTypes.string,
		step: PropTypes.number,
		onClick: PropTypes.func,
	};

	static defaultProps = {
		label: '',
		step: 1,
		onClick: () => '',
	};

	constructor(props) {
		super(props);

		this.state = {
			value: props.value,
		}
	};

	onClick = () => {
		const { step } = this.props;
		return this.props.onClick(x => x + step);
	};

	render() {
		const { label, id } = this.props;

		return (
			<div className="step-button">
				<button 
					onClick={this.onClick}
					type="button">
					{label}
				</button>
			</div>
		)
	};
}

export default StepButton;