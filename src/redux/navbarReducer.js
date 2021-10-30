const initialState = {
	friends: [
		{
			id: 1,
			avatar: "https://www.redwolf.in/image/cache/catalog/artwork-Images/mens/iron-man-mask-design-image'-700x700.png",
			name: 'Iron Man'
		},
		{
			id: 2,
			avatar: "https://pbs.twimg.com/profile_images/1222646977332174849/xWcD6t_Q_400x400.jpg",
			name: 'Spider Man'
		},
		{
			id: 3,
			avatar: "https://cdn.dribbble.com/users/364516/screenshots/2996144/strange.jpg?compress=1&resize=400x300",
			name: 'Dr. Strange'
		}
	]
};

const navbarReducer = (state = initialState, action) => {
	return state;
}

export default navbarReducer;