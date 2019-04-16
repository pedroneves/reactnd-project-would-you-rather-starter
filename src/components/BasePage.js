import { Row, Col } from 'antd';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Route, Switch } from 'react-router-dom';

import Nav from './Nav';
import QuestionPage from './QuestionPage';
import AnsweredPage from './AnsweredPage';
import UnansweredPage from './UnansweredPage';

import { handleGetUsers } from '../actions/users';
import { handleFetchQuestions } from '../actions/questions'

class BasePage extends Component {
	componentDidMount () {
		this.props.fetchUsers();
		this.props.fetchQuestions();
	}

	render () {
		return (
			<div>
				<Row type="flex" justify="center">
					<Col>
						<h1>Hello, {this.props.authedUser.name}</h1>
					</Col>
				</Row>

				<Row>
					<Col span={10} offset={7}>
						<Nav />
					</Col>
				</Row>

				<Switch>
					<Route exact path='/question/:id' component={QuestionPage} />
					<Route exact path='/unanswered' component={UnansweredPage} />
					<Route exact path='/answered' component={AnsweredPage} />
					<Route exact path='/' component={UnansweredPage} />
					<Route path='/' component={UnansweredPage} />
				</Switch>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	const { authedUser } = state;
	return { authedUser };
}

const mapDispatchToProps = dispatch => {
	return bindActionCreators({
		fetchUsers: handleGetUsers,
		fetchQuestions: handleFetchQuestions
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(BasePage);