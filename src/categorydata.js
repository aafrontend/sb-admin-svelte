const wait = delay => new Promise(resolve => setTimeout(resolve, delay))

export const load = async () => {
	await wait(500)
	return [
        {cid: "1", categoryname: "Singapore History", image: "[IMAGE]", action: "edit"},
	]
}