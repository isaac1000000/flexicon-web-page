import { Component } from 'react';
import PropTypes from 'prop-types';
import './NumberInput.css';

class NumberInput extends Component {

	static propTypes = {
	    id: PropTypes.string.isRequired,
	    value: PropTypes.number,
	    label: PropTypes.string,
	    onChange: PropTypes.func,
	    max: PropTypes.number,
	    min: PropTypes.number,
	    step: PropTypes.number,
	    placeholder: PropTypes.number,
	};

	static defaultProps = {
	    focused: false,
	    value: null,
	    label: '',
	    max: 1.0,
	    min: 0.0,
	    step: 0.05,
	    placeholder: 0.0,
	    onChange: () => '',
	};

	onChange = event => {
		let value = event.target.value;
		if (this.state.min > value) {
			value = this.state.min;
		} else if (value > this.state.max) {
			value = this.state.max;
		}
		this.setState({ value });
		return this.props.onChange(value);
	};

	constructor(props) {
		super(props);

		this.state = {
			value: props.value,
			label: props.label,
			min: props.min,
			max: props.max,
			focused: false,
		};
	};

	render() {
		const { min, max, label, focused, value } = this.state;
		const { step, id, placeholder } = this.props;
		const inputClassName = `number-input ${(focused || value) && 'focused'}`

		return (
			<div className={inputClassName}>
				{label}
				<input 
					id={id}
					type="number"
					placeholder={placeholder}
					onChange={this.onChange}
					min={min}
					max={max}
					step={step}
					onFocus={() => this.setState({ focused: true })}
        			onBlur={() => this.setState({ focused: false })}
				/>
			</div>
		)
	}
}

export default NumberInput;