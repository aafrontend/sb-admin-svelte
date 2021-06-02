let feedback = [];

export const load = async () => {
	return new Promise((resolve, reject) => {
			fetch(`http://ec2-54-255-217-149.ap-southeast-1.compute.amazonaws.com:5000/api/feedback/all`, {
			method: "GET",
	})
	.then((resp) => resp.json())
	.then((data) => feedback = data)
	.then(() => {console.log(feedback); resolve(feedback)})
	.catch((e) => {console.log(e.message); reject(e)});
	}
	
	)

}