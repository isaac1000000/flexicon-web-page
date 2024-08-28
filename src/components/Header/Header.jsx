import { Component } from 'react';
import './Header.css';

class Header extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="header">
				<h1>flexicon</h1>
			</div>
		)
	}
}

export default Header;