let questions = [];

export const load = async () => {
	return new Promise((resolve, reject) => {
			fetch(`http://ec2-54-255-217-149.ap-southeast-1.compute.amazonaws.com:5000/api/quiz/questions`, {
			method: "GET",
	})
	.then((resp) => resp.json())
	.then((data) => questions = data)
	.then(() => {console.log(questions); resolve(questions)})
	.catch((e) => {console.log(e.message); reject(e)});
	}
	
	)

}