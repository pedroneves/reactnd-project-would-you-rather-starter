import Moment from 'moment';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import React, { Component } from 'react';

class PollItem extends Component {
	handleSelect = (event) => {
		event.preventDefault();
		const to = `/question/${this.props.question.id}`
		this.props.history.push(to)
	}

	render () {
		const { question } = this.props;
		return (
			<div onClick={this.handleSelect} className="poll-item">
				<p className="poll-title">Click to see what {question.author.name} has asked :D</p>
				<p className="poll-date">Asked at {Moment(question.timestamp).format('MM-DD-YYYY HH:mm')}</p>
			</div>
		)
	}
}

PollItem.propTypes = {
	question: PropTypes.shape({
		id: PropTypes.string.isRequired,
		timestamp: PropTypes.number.isRequired,
		optionOne: PropTypes.shape({
			votes: PropTypes.arrayOf(PropTypes.string).isRequired,
			text: PropTypes.string.isRequired
		}),
		author: PropTypes.shape({
			id: PropTypes.string.isRequired,
			name: PropTypes.string.isRequired,
			avatarURL: PropTypes.string.isRequired,
			questions: PropTypes.arrayOf(PropTypes.string).isRequired,
			answers: PropTypes.object.isRequired
		})
	}),
}

export default withRouter(PollItem);