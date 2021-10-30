import profileReducer, {addPost, deletePost} from "./profileReducer";


const state = {
	mainImage: 'https://robbycook.files.wordpress.com/2013/07/avengers_design_wip_031.jpg',
	postsData: [
		{id: 1, post: "HULK!!!!!!!!!!!!!!!", likesCount: 20},
		{id: 2, post: "SMASH!!!!!!!!!!!!!!", likesCount: 21230},
		{id: 3, post: "LIKE", likesCount: 21211130},
		{id: 4, post: "IIIIIIIIIIIIIIIITTTTTTTTTTTTTTTTTTTTTTTTT", likesCount: 0},
	]
}


it('postData\'s length should be incremented', () => {
	const action = addPost('test post');
	const newState = profileReducer(state, action);

	expect(newState.postsData.length).toBe(5);
});

it('new post\'s text should be correct', () => {
	const action = addPost('test post');
	const newState = profileReducer(state, action);

	expect(newState.postsData[0].post).toBe('test post');
});

it('new post\'s likes count should be 0', () => {
	const action = addPost('test post');
	const newState = profileReducer(state, action);

	expect(newState.postsData[0].likesCount).toBe(0);
});

it('after deleting post post\'s length should be decremented', () => {
	const action = deletePost(1);
	const newState = profileReducer(state, action);

	expect(newState.postsData.length).toBe(3);
});