import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Row, Col } from 'antd';

import Nav from './Nav';
import NotFoundPage from './NotFoundPage';
import AnsweredPage from './AnsweredPage';
import UnansweredPage from './UnansweredPage';

class HomePage extends Component {
	parseQuestion = (question) => {
		const clone = Object.assign({}, question);
		clone.author = Object.assign({}, this.props.users.byId[question.author]);
		return clone;
	}

	renderUnansweredPage = () => {
		const { authedUser, questions } = this.props;

		const answeredIds = Object.keys(authedUser.answers);
		const unanswered = Object.values(questions.byId)
			.filter(question => !answeredIds.includes(question.id))
			.map(this.parseQuestion)
			.sort((a, b) => b.timestamp - a.timestamp)

		return <UnansweredPage questions={unanswered} />
	}

	renderAnsweredPage = () => {
		const { authedUser, questions } = this.props;

		const answeredIds = Object.keys(authedUser.answers);
		const answered = Object.values(questions.byId)
			.filter(question => answeredIds.includes(question.id))
			.map(this.parseQuestion)
			.sort((a, b) => b.timestamp - a.timestamp)

		return <AnsweredPage questions={answered} />
	}

	renderNav () {
		const sections = [
			{ name: 'Unanswered', path: '/unanswered', selectedIf: ['/', '/unanswered'] },
			{ name: 'Answered', path: '/answered' }
		];

		return <Nav sections={sections} />
	}

	render () {
		return (
			<Row>
				<Col>
					<Row>
						<Col>
							{this.renderNav()}
						</Col>
					</Row>
					<Row>
						<Switch>
							<Route exact path='/answered' render={this.renderAnsweredPage} />
							<Route exact path='/unanswered' render={this.renderUnansweredPage} />
							<Route exact path='/' render={this.renderUnansweredPage} />
							<Route path='/' component={NotFoundPage} />
						</Switch>
					</Row>
				</Col>
			</Row>
		)
	}
}

export default HomePage;