import { Row, Col, Icon, Spin } from 'antd';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Route, Switch } from 'react-router-dom';

import Nav from './Nav';
import QuestionPage from './QuestionPage';
import AnsweredPage from './AnsweredPage';
import UnansweredPage from './UnansweredPage';

import { handleGetUsers } from '../actions/users';
import { handleFetchQuestions } from '../actions/questions';

import '../styles/base.css';

class BasePage extends Component {
	componentDidMount () {
		this.props.fetchUsers();
		this.props.fetchQuestions();
	}

	parseQuestion = (question) => {
		const clone = Object.assign({}, question);
		clone.author = Object.assign({}, this.props.users.byId[question.author]);
		return clone;
	}

	renderLoadingIcon () {
		const icon = (<Icon type="loading" style={{ fontSize: 24 }} spin />)
		return (
			<div className="loading-container">
				<Spin indicator={icon}></Spin>
			</div>
		);
	}

	renderSubsection () {
		const isUsersLoaded = this.props.users.isSuccess;
		const isQuestionsLoaded = this.props.questions.isSuccess;
		const isLoaded = isUsersLoaded || isQuestionsLoaded;

		if (isLoaded) {
			return (
				<Switch>
					<Route exact path='/question/:id' component={QuestionPage} />
					<Route exact path='/unanswered' render={this.renderUnansweredPage} />
					<Route exact path='/answered' render={this.renderAnsweredPage} />
					<Route exact path='/' component={UnansweredPage} />
					<Route path='/' component={UnansweredPage} />
				</Switch>
			)
		}

		return this.renderLoadingIcon()
	}

	renderUnansweredPage = () => {
		const answeredIds = Object.keys(this.props.authedUser.answers);
		const unanswered = Object.values(this.props.questions.byId)
			.filter(question => !answeredIds.includes(question.id))
			.map(this.parseQuestion)
			.sort((a, b) => b.timestamp - a.timestamp)

		return <UnansweredPage questions={unanswered} />
	}

	renderAnsweredPage = () => {
		const answeredIds = Object.keys(this.props.authedUser.answers);
		const answered = Object.values(this.props.questions.byId)
			.filter(question => answeredIds.includes(question.id))
			.map(this.parseQuestion)
			.sort((a, b) => b.timestamp - a.timestamp)

		return <AnsweredPage questions={answered} />
	}

	render () {
		return (
			<div className="base">
				<Row type="flex" justify="center">
					<Col>
						<h1>Hello, {this.props.authedUser.name.split(' ')[0]}!</h1>
					</Col>
				</Row>

				<Row>
					<Col span={10} offset={7}>
						<Nav />
					</Col>
				</Row>

				{this.renderSubsection()}
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	const { authedUser, questions, users } = state;
	return { authedUser, questions, users };
}

const mapDispatchToProps = dispatch => {
	return bindActionCreators({
		fetchUsers: handleGetUsers,
		fetchQuestions: handleFetchQuestions
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(BasePage);