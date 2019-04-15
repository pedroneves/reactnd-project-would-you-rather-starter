import { Row, Col } from 'antd';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Nav extends Component {
	render() {
		const style = { textAlign: 'center' }

		return (
			<Row style={{marginTop: '20px'}} type="flex" justify="space-around">
				<Col style={style} >
					<Link to="/unanswered">Unanswered</Link>
				</Col>
				<Col style={style} >
					<Link to="/answered">Answered</Link>
				</Col>
				<Col style={style} >
					<p>New</p>
				</Col>
				<Col style={style} >
					<p>Leaderboard</p>
				</Col>
			</Row>
		)
	}
}

export default Nav;