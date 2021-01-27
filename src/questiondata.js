let questions = [];

export const load = async () => {
	return new Promise((resolve, reject) => {
			fetch(`http://localhost:5000/api/quiz/questions`, {
			method: "GET",
	})
	.then((resp) => resp.json())
	.then((data) => questions = data)
	.then(() => {console.log(questions); resolve(questions)})
	.catch((e) => {console.log(e.message); reject(e)});
	}
	
	)

}