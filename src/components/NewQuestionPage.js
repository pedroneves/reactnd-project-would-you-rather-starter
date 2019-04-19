import { connect } from 'react-redux';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';
import { Button, Col, Form, Input, Row } from 'antd';

import { handleCreateQuestion, resetSaveQuestion } from '../actions/questions';

class BaseNewQuestionForm extends Component {
	renderOption = (type) => {
		const { getFieldDecorator } = this.props.form;
		const id = type === 'one' ? 'optionOne' : 'optionTwo';
		const order = type === 'one' ? 'first' : 'second';
		const options = {
			rules: [
				{ required: true, message: `Please input the ${order} option` },
				{ min: 1, message: `Please, create an option with at least 3 chars` },
				{ max: 50, message: `Please, create an option with at most 50 chars` }
			]
		};
		const { disabled } = this.props;
		const input = (
			<Input
				disabled={disabled}
				placeholder={`Insert the text of the ${order} option`}
			/>
		);

		return getFieldDecorator(id, options)(input)
	}

	onSubmit = (event) => {
		event.preventDefault();
		this.props.form.validateFields((error, values) => {
			if (!error) {
				this.props.submit(values)
			}
		})
	}

	render () {
		const { disabled } = this.props;

		return (
			<Form onSubmit={this.onSubmit}>
				<Form.Item>
					{ this.renderOption('one')}
				</Form.Item>
				<h2 style={{textAlign: 'center'}}>OR</h2>
				<Form.Item style={{marginTop: '24px'}}>
					{ this.renderOption('two')}
				</Form.Item>
				<Form.Item>
					<Button
						block
						size="large"
						type="primary"
						htmlType="submit"
						disabled={disabled}
					>
						Create!
					</Button>
				</Form.Item>
			</Form>
		);
	}
}

const NewQuestionForm = Form.create({
	name: 'new_question_form'
})(BaseNewQuestionForm);

class NewQuestionPage extends Component {
	handleSubmitQuestion = (args) => {
		const authorId = this.props.authedUser.id;
		const optionOneText = args.optionOne;
		const optionTwoText = args.optionTwo;
		this.props.handleCreateQuestion({ authorId, optionOneText, optionTwoText });
	}

	componentWillUnmount () {
		this.props.resetSaveQuestion();
	}

	render () {
		if (this.props.hasFinishedSaving && this.props.isQuestionSavedSuccess) {
			return <Redirect to="/unanswered" />
		}

		return (
			<Row>
				<Col xs={1} sm={4} md={6}></Col>
				<Col xs={22} sm={16} md={12}>
					<h1 style={{textAlign: 'center'}}>Would you rather...</h1>
					<NewQuestionForm
						submit={this.handleSubmitQuestion}
						disabled={this.props.isSavingQuestion}
					/>
				</Col>
				<Col xs={1} sm={4} md={6}></Col>
			</Row>
		)
	}
}

function mapStateToProps (state) {
	const {
		isSavingQuestion,
		hasFinishedSaving,
		isQuestionSavedSuccess,
		isQuestionSavedFail
	} = state.questions;

	const { authedUser } = state

	return {
		authedUser,
		isSavingQuestion,
		hasFinishedSaving,
		isQuestionSavedSuccess,
		isQuestionSavedFail
	};
}

function mapDispatchToProps (dispatch) {
	return bindActionCreators({
		handleCreateQuestion,
		resetSaveQuestion
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NewQuestionPage);