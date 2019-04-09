import React, { Component } from 'react';
import { Row, Col } from 'antd';

class Nav extends Component {
	render() {
		const style = { textAlign: 'center' }

		return (
			<Row style={{marginTop: '20px'}} type="flex" justify="space-around">
				<Col style={style} >
					<p>Unanswered</p>
				</Col>
				<Col style={style} >
					<p>Answered</p>
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