import { Avatar, Col, Row } from 'antd';
import { connect } from 'react-redux';
import React, { Component, Fragment } from 'react';

class LeaderboardPage extends Component {
	rank() {
		const { users, questions } = this.props;

		const rank = users.ids.map(uid => {
			const asked = questions
				.ids
				.filter(qid => questions.byId[qid].author === uid)
				.length;

			const answered = questions
				.ids
				.filter(qid => {
					const question = questions.byId[qid];
					const votedOne = question.optionOne.votes.includes(uid);
					const votedTwo = question.optionTwo.votes.includes(uid);
					return votedOne || votedTwo;
				})
				.length;

			const total = asked + answered;

			return {user: uid, asked, answered, total}
		})

		rank.sort((a,b) => {
			if (b.total !== a.total) {
				return b.total - a.total
			} else {
				if (b.answered !== a.answered) {
					return b.answered - a.answered;
				} else {
					return b.asked - a.asked;
				}
			}
		})

		return rank;
	}

	renderAvatarByPos = (user, pos) => {
		const sizes = [55, 40, 30];
		const sizeIdx = pos >= sizes.length ? sizes.length - 1 : pos;
		const size = sizes[sizeIdx];

		return <Avatar size={size} icon="user" src={user.avatarURL} />
	}

	renderRankStatsByPos = (user, rank, pos) => {
		const style = { marginBottom: '5px' }
		const names = [
			<h1 style={style}>{user.name}</h1>,
			<h2 style={style}>{user.name}</h2>,
			<h3 style={style}>{user.name}</h3>
		];
		const nameIdx = pos >= names.length ? names.length - 1 : pos;
		const name = names[nameIdx];

		return (
			<Fragment>
				{name}
				<p>Asked: {rank.asked}</p>
				<p>Answered: {rank.answered}</p>
			</Fragment>
		)
	}

	render () {
		const ranking = this.rank();

		return (
			<Row type="flex" justify="space-around" align="middle">
				<Col xs={23} sm={20} md={16} lg={12} xl={8} xxl={6}>
					{
						ranking.map((rank, pos) => {
							const user = this.props.users.byId[rank.user];

							return (
								<Row style={{marginBottom: '20px'}} key={user.id}>
									<Col  span={10} style={{textAlign:'right', padding: '20px'}}>
										{this.renderAvatarByPos(user, pos)}
									</Col>
									<Col span={14}>{this.renderRankStatsByPos(user, rank, pos)}</Col>
								</Row>
							)
						})
					}
				</Col>
			</Row>
		)
	}
}

function mapStateToProps (state) {
	const { questions, users } = state;
	return { questions, users };
}

export default connect(mapStateToProps)(LeaderboardPage);