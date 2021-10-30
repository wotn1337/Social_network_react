export const requiredField = (value) => {
	if (!value) {
		return 'Field is required';
	}
};

export const maxLength = (len) => (value) => {
	if (value.length > len) {
		return `Max length is ${len} symbols`;
	}
};