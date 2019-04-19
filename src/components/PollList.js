import { Card, Typography } from 'antd'
import React, { Component } from 'react';

import PollItem from './PollItem';

const { Text } = Typography;

class PollList extends Component {
	render () {
		const { questions=[] } = this.props;

		if (questions.length === 0) {
			return (
				<Card>
					<Text disabled>No questions available...</Text>
				</Card>
			)
		}

		return (
			<Card>
				{
					questions.map(question => {
						return <PollItem key={question.id} question={question} />
					})
				}
			</Card>
		)
	}
}

export default PollList;