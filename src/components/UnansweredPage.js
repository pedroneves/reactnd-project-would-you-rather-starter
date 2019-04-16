import { Col, Row } from 'antd';
import React, { Component } from 'react';

import PollList from './PollList';

class UnansweredPage extends Component {
	render () {
		return (
			<Row>
				<Col xs={1} sm={4}></Col>
				<Col xs={22} sm={16}>
					<PollList questions={this.props.questions} />
				</Col>
				<Col xs={1} sm={4}></Col>
			</Row>
		)
	}
}

export default UnansweredPage;