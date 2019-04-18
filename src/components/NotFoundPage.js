import { Col, Row } from 'antd';
import React, { Component } from 'react';

class NotFoundPage extends Component {
	render () {
		return (
			<Row>
				<Col xs={24}>
					<h1 style={{textAlign: 'center'}}>Ops, nothing to do here...</h1>
				</Col>
			</Row>
		)
	}
}

export default NotFoundPage;