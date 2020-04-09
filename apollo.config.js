module.exports = {
	client: {
		service: {
			name: 'API',
			url: 'http://localhost:5000/api',
		},
		includes: ['./src/api/gql/**/*.js'],
	},
}
