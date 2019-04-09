import React, { Component } from 'react';
import { Row, Col } from 'antd';

class Nav extends Component {
	render() {
		return (
			<Row type="flex" gutter={20} justify="center">
				<Col>Unanswered</Col>
				<Col>Answered</Col>
				<Col>New</Col>
				<Col>Leaderboard</Col>
			</Row>
		)
	}
}

export default Nav;