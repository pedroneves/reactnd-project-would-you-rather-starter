import { Row, Col } from 'antd';
import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Nav from './Nav';
import QuestionPage from './QuestionPage';

class BasePage extends Component {
	render () {
		return (
			<div>
				<Row type="flex" justify="center">
					<Col>
						<h1>Hello, username</h1>
					</Col>
				</Row>

				<Row>
					<Col span={10} offset={7}>
						<Nav />
					</Col>
				</Row>

				<Route exact path='/question/:id' component={QuestionPage}></Route>
			</div>
		)
	}
}

export default BasePage;