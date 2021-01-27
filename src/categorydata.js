let categories = [];

export const load = async () => {
	return new Promise((resolve, reject) => {
			fetch(`http://localhost:5000/api/quiz/categories`, {
			method: "GET",
	})
	.then((resp) => resp.json())
	.then((data) => categories = data)
	.then(() => {console.log(categories); resolve(categories)})
	.catch((e) => {console.log(e.message); reject(e)});
	}
	
	)

}