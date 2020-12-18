const wait = delay => new Promise(resolve => setTimeout(resolve, delay))

export const load = async () => {
	await wait(500)
	return [
        {qid: "1", question:"Where is Singapore located?",message: "typo in the options",date: "2020-12-16 00:00:00",action: "delete"},
        
	]
}