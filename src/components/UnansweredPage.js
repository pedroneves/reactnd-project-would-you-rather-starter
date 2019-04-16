import { Col, Row } from 'antd';
import React, { Component } from 'react';

import PollList from './PollList';

class UnansweredPage extends Component {
	render () {
		return (
			<Row>
				<Col xs={1} sm={4} md={6}></Col>
				<Col xs={22} sm={16} md={12}>
					<PollList questions={this.props.questions} />
				</Col>
				<Col xs={1} sm={4} md={6}></Col>
			</Row>
		)
	}
}

export default UnansweredPage;