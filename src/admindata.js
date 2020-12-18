const wait = delay => new Promise(resolve => setTimeout(resolve, delay))

export const load = async () => {
	await wait(500)
	return [
        {username: "admin",role: "admin",created: "2019-02-28 16:26:22",action: "edit"},
        
        
	]
}