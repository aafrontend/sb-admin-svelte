const wait = delay => new Promise(resolve => setTimeout(resolve, delay))

export const load = async () => {
	await wait(500)
	return [
        {id: "1", name: "Mark",email: "Mark@gmail.com",mobile: "81818181",type: "Google",status: "Active",date: "20-Feb-2020",action: "Edit"},
        {id: "2", name: "Angel",email: "AGF@gmail.com",mobile: "83214153",type: "Google",status: "Active",date: "20-Feb-2020",action: "Edit"},
        {id: "3", name: "Zane",email: "zaney@gmail.com",mobile: "94657653",type: "Google",status: "Active",date: "20-Feb-2020",action: "Edit"},
        {id: "4", name: "Peter",email: "parketpete@gmail.com",mobile: "84567863",type: "Google",status: "Active",date: "20-Feb-2020",action: "Edit"},
        {id: "5", name: "Denzel",email: "chandz@gmail.com",mobile: "98034565",type: "Google",status: "Active",date: "20-Feb-2020",action: "Edit"},
        {id: "6", name: "Joey",email: "jojo@gmail.com",mobile: "81123565",type: "Google",status: "Active",date: "20-Feb-2020",action: "Edit"},
        {id: "7", name: "Zoe",email: "zoetay@gmail.com",mobile: "93454421",type: "Google",status: "Active",date: "20-Feb-2020",action: "Edit"},
        {id: "8", name: "Mark",email: "pokemark@gmail.com",mobile: "98887512",type: "Google",status: "Active",date: "20-Feb-2020",action: "Edit"},
        {id: "9", name: "Marcus",email: "marcissd@gmail.com",mobile: "93592641",type: "Google",status: "Active",date: "20-Feb-2020",action: "Edit"},
        {id: "10", name: "Ming",email: "xiaoming666@gmail.com",mobile: "82864987",type: "Google",status: "Active",date: "20-Feb-2020",action: "Edit"},
        {id: "11", name: "Halima",email: "yacoooob@gmail.com",mobile: "89136125",type: "Google",status: "Active",date: "20-Feb-2020",action: "Edit"},
        {id: "12", name: "Quinn",email: "clq@gmail.com",mobile: "83151625",type: "Google",status: "Active",date: "20-Feb-2020",action: "Edit"},
        {id: "13", name: "Ben",email: "benlim@gmail.com",mobile: "98741564",type: "Google",status: "Active",date: "20-Feb-2020",action: "Edit"},

        
	]
}