var axios = require('axios')

module.exports.list = () => {
	return axios.get("http://localhost:3000/users")
		.then(answer => {
			return answer.data
		})
		.catch(error => {
			return error
		})
}

module.exports.addUser = user => {
	return axios.post("http://localhost:3000/users/", user)
		.then(answer => {
			return answer.data
		})
		.catch(error => {
			return error
		})
}
