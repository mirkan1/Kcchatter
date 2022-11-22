import parseXlsx from 'excel';
import fs from "fs";
import { detect } from 'csv-string'
import { sensitiveHeaders } from 'http2';

type Row = {
    [key: string]: string;
}

export default class Reader {
    content: Row[] = [];
    headers: string[] = [];
    delimeter: string = ',';

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
                        this.setCsvLogic(line)
                    } else {
                        const row: Row = {};
                        const columns = line.split(this.delimeter);
                        columns.forEach((column, index) => {
                            row[index] = column.replace("\r", "");
                        });
                        const storeNum = columns[9];
                        const state = columns[7];
                        const fullAddress = `${columns[4]}-${storeNum} | ${columns[5]} | ${columns[6]}, ${state}`;
                        row[Object.keys(row).length] = fullAddress;
                        if (Object.entries(row).length == Object.entries(this.headers).length) {
                            this.content.push(row);
                        }
                    }
                });
            });
        }
    }

    setCsvLogic(line: string) {
        this.delimeter = detect(line);
        this.headers = line.split(this.delimeter);
        this.headers.push('Full Address');
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

    getRowsByEmail(email: string): Object {
        var role, name;
        const rows: Row[] = [];
        console.log(this.content)
        this.content.forEach((row) => {
            email = email.toUpperCase();
            if (row[1].toUpperCase() === email) {
                // R S EMAIL
                role = this.headers[1];
                name = row[0];
                rows.push(row);
            } else if (row[3].toUpperCase() === email) {
                // R R EMAIL
                role = this.headers[3];
                name = row[2];
                rows.push(row);
            } else if (row[11].toUpperCase() === email) {
                // CLIENT1 EMAIL
                role = this.headers[11];
                name = row[10];
                rows.push(row);
            } else if (row[13].toUpperCase() === email) {
                // CLIENT2 EMAIL
                role = this.headers[13];
                name = row[12];
                rows.push(row);
            }
        }, [role, name]);
        console.log(name, role)
        return { role, name, rows };
    }
}