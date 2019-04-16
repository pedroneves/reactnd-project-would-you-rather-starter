import React, { Component } from 'react';

class PollList extends Component {
	render () {
		const { questions } = this.props;
		return (
			<div>
				{questions.map(question => {
					return <div key={question.id}>{question.author.name} {question.timestamp}</div>
				})}
			</div>
		)
	}
}

export default PollList;