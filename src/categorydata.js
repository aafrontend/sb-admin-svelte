let categories = [];

export const load = async () => {
	return new Promise((resolve, reject) => {
			fetch(`http://ec2-54-255-217-149.ap-southeast-1.compute.amazonaws.com:5000/api/quiz/categories`, {
			method: "GET",
	})
	.then((resp) => resp.json())
	.then((data) => categories = data)
	.then(() => {console.log(categories); resolve(categories)})
	.catch((e) => {console.log(e.message); reject(e)});
	}
	
	)

}