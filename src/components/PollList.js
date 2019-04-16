import { Card } from 'antd'
import React, { Component } from 'react';

import PollItem from './PollItem';

class PollList extends Component {
	render () {
		const { questions } = this.props;
		return (
			<Card>
				{questions.map(question => {
					return <PollItem key={question.id} question={question} />
				})}
			</Card>
		)
	}
}

export default PollList;