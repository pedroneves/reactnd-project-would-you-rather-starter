import React, { Component } from 'react';
import { Button, Col, Form, Input, Row } from 'antd';

class BaseNewQuestionForm extends Component {
	renderOption = (type) => {
		const { getFieldDecorator } = this.props.form;
		const id = type === 'one' ? 'optionOne' : 'optionTwo';
		const order = type === 'one' ? 'first' : 'second';
		const number = type === 'one' ? '1' : '2';
		const options = {
			rules: [
				{ required: true, message: `Please input the ${order} option` },
				{ min: 3, message: `Please, create an option with at least 3 chars` },
				{ max: 50, message: `Please, create an option with at most 50 chars` }
			]
		};
		const input = (<Input placeholder={`Insert the text of the option ${number}`} />);

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
		return (
			<Form onSubmit={this.onSubmit}>
				<Form.Item >
					{ this.renderOption('one')}
				</Form.Item>
				<h2 style={{textAlign: 'center'}}>OR</h2>
				<Form.Item style={{marginTop: '24px'}}>
					{ this.renderOption('two')}
				</Form.Item>
				<Form.Item>
					<Button block size="large" type="primary" htmlType="submit">
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
		console.log(args);
	}

	render () {
		return (
			<Row>
				<Col xs={1} sm={4} md={6}></Col>
				<Col xs={22} sm={16} md={12}>
					<h1 style={{textAlign: 'center'}}>Would you rather...</h1>
					<NewQuestionForm submit={this.handleSubmitQuestion}/>
				</Col>
				<Col xs={1} sm={4} md={6}></Col>
			</Row>
		)
	}
}

export default NewQuestionPage;