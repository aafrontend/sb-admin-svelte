/*

import {writable} from 'svelte/store'
import Papa from 'papaparse'


function createCsvStore() {
    const {subscribe, set, update} = writable(null)

    const loadFile = (csvFile) => {
        let columns = null;
        let rows = null;
        let errors = null;

        const conf = {
            worker: true,
            header: true
        }

        Papa.parse(csvFile, {
            ...conf,
            step: ({data, meta, errors: _errors}) => {
                if (!columns) {
                    columns = Object.keys(data).map(key => ({
                        display: key,
                        dataName: key
                    }))
                    meta.filename = csvFile.name
                    rows = [data]
                    set({columns, meta, rows, selection: null})
                } else {
                    rows.push(data)
                }
                errors = _errors
            },
            complete: () =>{
                for (const error of errors) {
                    console.log(error);
                    rows.splice(error.row, 1)
                }
                update(csv => {
                    csv.rows = rows;
                    return csv;
                })

                subscribe(console.log)

            }
        })
    }




    const updateCell = (value, rowData) => {
        update(csv => {
            csv.rows[rowData.index][rowData.dataName] = value;
            return csv
        })
    }

    const updateHeader = (value,index) => {
        update(csv => {
            csv.columns[index].display = value;
            return csv;
        })
    }

    const addRow = () => update(csv => {
        const newRow = csv.columns.reduce((acc,{dataName}) => {
            acc[dataName] = '';

            return acc;
        }, {})
        
        if(csv.selection) {
            csv.rows.splice(csv.selection, 0, newRow);
            csv.selection++;
        } else {
            csv.rows.push(newRow);
            ScrollIndex.set(csv.rows.length -1);
        }

        return csv;
    })

    const removeRow = () => update(csv => {
        if (csv.selection) {
            csv.rows.splice(csv.selection, 1);
            csv.selection = null;
        }
        return csv;
    })

    const selectRow = (index) => update(csv => {
        if(value === csv.selection) {
            csv.selection = null;
        } else {
            csv.selection = index;
        }
    })

    return {
        subscribe,
        loadFile,
        updateCell,
        updateHeader,
        addRow,
        removeRow,
        selectRow,
    }

}

export default createCsvStore();
*/