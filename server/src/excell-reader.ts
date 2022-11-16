import parseXlsx from 'excel';
import fs from "fs";

type Row = {
    [key: string]: string;
}

export default class Reader {
    content: Row[] = [];
    headers: string[] = [];

    constructor(filePath: string) {
        const fileName = filePath.split('\\').pop();
        const fileExtension = fileName?.split('.').pop();
        if (fileExtension === 'xlsx') {
            // TODO: Implement xlsx reader
            parseXlsx(filePath).then((data: any) => {
                console.log(data);
            });
        } else if (fileExtension === 'csv') {
            // open csv file and read lines without the first row
            fs.readFile(filePath, { encoding: 'utf8' }, (err, data) => {
                if (err) {
                    if (err.code === 'ENOENT') {
                        console.error('file does not exist');
                        return;
                    }
                    throw err;
                }
                // read the file
                const lines = data.split('\n');
                lines.forEach((line, index) => {
                    if (index === 0) {
                        this.headers = line.split(',');
                    } else {
                        const row: Row = {};
                        const columns = line.split(',');
                        columns.forEach((column, index) => {
                            row[index] = column;
                        });
                        // hard coded below
                        if (Object.entries(row).length == Object.entries(this.headers).length + 1) {
                            this.content.push(row);
                        }
                    }
                });
            });
        }
    }

    getRows(row: string | undefined): Row[] {
        return this.content;
    }

    getRow(row: string | number | undefined): Row[] {
        return this.content[row];
    }

    getHeaders(): string[] {
        return this.headers;
    }

    getRowByEmail(email: string): Row[] {
        const rows: Row[] = [];
        console.log(this.content)
        this.content.forEach((row) => {
            email = email.toUpperCase();
            if (row[1].toUpperCase() === email) {
                // RSEMAIL
                rows.push(row);
            } else if (row[3].toUpperCase() === email) {
                // RREMAIL
                rows.push(row);
            }
        });
        return rows;
    }
}