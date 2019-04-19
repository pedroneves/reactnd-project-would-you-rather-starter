import { connect } from 'react-redux';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Route, Switch } from 'react-router-dom';
import { Row, Col, Icon, Spin, Button } from 'antd';

import Nav from './Nav';
import QuestionPage from './QuestionPage';
import HomePage from './HomePage';
import NewQuestionPage from './NewQuestionPage';
import LeaderboardPage from './LeaderboardPage';

import { handleGetUsers } from '../actions/users';
import { handleSignOut } from '../actions/authed-user';
import { handleFetchQuestions } from '../actions/questions';

import '../styles/base.css';

class BasePage extends Component {
	componentDidMount () {
		this.props.fetchUsers();
		this.props.fetchQuestions();
	}

	handleSignOut = (event) => {
		event.preventDefault();
		this.props.signout();
	}

	renderLoadingIcon () {
		const icon = (<Icon type="loading" style={{ fontSize: 24 }} spin />)
		return (
			<div className="loading-container">
				<Spin indicator={icon}></Spin>
			</div>
		);
	}

	renderHome = () => {
		return (
			<HomePage
				users={this.props.users}
				questions={this.props.questions}
				authedUser={this.props.authedUser}
			/>
		)
	}

	renderNav () {
		const sections = [
			{ name: 'Home', path: '/', selectedIf: ['/', '/answered', '/unanswered']},
			{ name: 'New', path: '/add' },
			{ name: 'Leaderboard', path: '/leaderboard' }
		];

		return (
			<Nav sections={sections} />
		)
	}

	renderSubsection () {
		const isUsersLoaded = this.props.users.isSuccess;
		const isQuestionsLoaded = this.props.questions.isSuccess;
		const isLoaded = isUsersLoaded || isQuestionsLoaded;

		if (isLoaded) {
			return (
				<Switch>
					<Route exact path='/question/:id' component={QuestionPage} />
					<Route exact path='/add' component={NewQuestionPage} />
					<Route exact path='/leaderboard' component={LeaderboardPage} />
					<Route path='/' render={this.renderHome} />
				</Switch>
			)
		}

		return this.renderLoadingIcon()
	}

	render () {
		return (
			<div className="base">
				<Row type="flex" justify="center">
					<Col>
						<h1>Hello, {this.props.authedUser.name.split(' ')[0]}!</h1>
					</Col>
				</Row>

				<Row type="flex" justify="center">
					<Col>
						<Button onClick={this.handleSignOut} size={'small'}>Sign out</Button>
					</Col>
				</Row>

				<Row>
					<Col span={16} offset={4}>
						{this.renderNav()}
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
		signout: handleSignOut,
		fetchUsers: handleGetUsers,
		fetchQuestions: handleFetchQuestions
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(BasePage);