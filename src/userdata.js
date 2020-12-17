const wait = delay => new Promise(resolve => setTimeout(resolve, delay))

export const load = async () => {
	await wait(500)
	return [
        ["1", "Mark", "Mark@gmail.com", "81818181", "Google", "Active", "20-Feb-2020", "Edit"],
        ["2", "Jack", "Jjck@gmail.com", "81342181", "Google", "Active", "15-Feb-2020", "Edit"],
        ["3", "Peter", "parkerpeter@gmail.com", "98465131", "Google", "Active", "17-Jan-2020", "Edit"],
        ["4", "Ming", "xiaoming666@gmail.com", "85184586", "Google", "Active", "11-Jan-2020", "Edit"],
        ["5", "Anders", "cdoanders@gmail.com", "89494851", "Google", "Active", "05-Jan-2020", "Edit"],
        ["6", "Mark", "Mark@gmail.com", "81818181", "Google", "Active", "20-Feb-2020", "Edit"],
        ["7", "Jack", "Jjck@gmail.com", "81342181", "Google", "Active", "15-Feb-2020", "Edit"],
        ["8", "Peter", "parkerpeter@gmail.com", "98465131", "Google", "Active", "17-Jan-2020", "Edit"],
        ["9", "Ming", "xiaoming666@gmail.com", "85184586", "Google", "Active", "11-Jan-2020", "Edit"],
        ["10", "Anders", "cdoanders@gmail.com", "89494851", "Google", "Active", "05-Jan-2020", "Edit"],
        ["11", "James", "Mark@gmail.com", "81818181", "Google", "Active", "20-Feb-2020", "Edit"],
        ["12", "Jack", "Jjck@gmail.com", "81342181", "Google", "Active", "15-Feb-2020", "Edit"],
        ["13", "Peter", "parkerpeter@gmail.com", "98465131", "Google", "Active", "17-Jan-2020", "Edit"],
        ["14", "Ming", "xiaoming666@gmail.com", "85184586", "Google", "Active", "11-Jan-2020", "Edit"],
        ["15", "Anders", "cdoanders@gmail.com", "89494851", "Google", "Active", "05-Jan-2020", "Edit"],
        ["16", "Mark", "Mark@gmail.com", "81818181", "Google", "Active", "20-Feb-2020", "Edit"],
        ["17", "Jack", "Jjck@gmail.com", "81342181", "Google", "Active", "15-Feb-2020", "Edit"],
        ["18", "Peter", "parkerpeter@gmail.com", "98465131", "Google", "Active", "17-Jan-2020", "Edit"],
        ["19", "Ming", "xiaoming666@gmail.com", "85184586", "Google", "Active", "11-Jan-2020", "Edit"],
        ["20", "Anders", "cdoanders@gmail.com", "89494851", "Google", "Active", "05-Jan-2020", "Edit"],
	]
}