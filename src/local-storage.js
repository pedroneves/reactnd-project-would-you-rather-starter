export function saveAuthedUser (user) {
	window.localStorage.setItem('authedUser', JSON.stringify(user));
};

export function getAuthedUser () {
	return JSON.parse(window.localStorage.getItem('authedUser'));
};

export function clearAuthedUser () {
	window.localStorage.setItem('authedUser', null);
};

export function hasAuthedUser () {
	return ![null, undefined].includes(getAuthedUser());
}