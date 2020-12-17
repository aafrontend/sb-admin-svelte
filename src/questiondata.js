const wait = delay => new Promise(resolve => setTimeout(resolve, delay))

export const load = async () => {
	await wait(500)
	return [
        {qid: "1", image: "[IMAGE]", question:"When did Universal Studios Singapore officially open?", opt_a: "28 May 2011", opt_b: "20 June 2015", opt_c: "29 January 2000", opt_d: "15 February 2003", answer: "a", level: "5", action: "edit"},
	]
}