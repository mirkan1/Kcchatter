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
                    }
                    const row: Row = {};
                    const columns = line.split(',');
                    columns.forEach((column, index) => {
                        row[index] = column;
                    });
                    this.content.push(row);
                });
            });
        }
    }

    getRows(): Row[] {
        return this.content;
    }

    getHeaders(): string[] {
        return this.headers;
    }
}