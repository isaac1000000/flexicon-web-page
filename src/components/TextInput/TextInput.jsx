import {Component} from 'react';
import PropTypes from 'prop-types';
import './TextInput.css';

class TextInput extends Component {
 	static propTypes = {
	    id: PropTypes.string.isRequired,
	    locked: PropTypes.bool,
	    focused: PropTypes.bool,
	    value: PropTypes.string,
	    error: PropTypes.string,
	    label: PropTypes.string,
	    onChange: PropTypes.func,
	};

	static defaultProps = {
	    locked: false,
	    focused: false,
	    value: '',
	    error: '',
	    label: '',
	    onChange: () => '',
	};

	constructor(props) {
		super(props);

		this.state = {
			focused: (props.locked && props.focused) || false,
			value: props.value,
			error: props.error || '',
			label: props.label,
		};
	};

	onChange = event => {
		const { id } = this.props;
		const value = event.target.value;
		this.setState({value, error: ''});
		return this.props.onChange(id, value);
	};

	render() {
		const { focused, value, error, label } = this.state;
		const { id, locked } = this.props;
		const fieldClassName = `field ${(locked ? focused : focused || value) && 'focused'} ${locked && !focused && 'locked'}`;

		return (
			<div className={fieldClassName}>
				<input
					id={id}
					type="text"
					value={value}
					placeholder={label}
					onChange={this.onChange}
					onFocus={() => !locked && this.setState({ focused: true })}
        			onBlur={() => !locked && this.setState({ focused: false })}
				/>
				<label htmlFor={id} className={error && 'error'}>
					{error || label}
				</label>
			</div>
			)
	}
}

export default TextInput;