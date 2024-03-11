import { ajax } from 'rxjs/ajax';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { webAbsoluteUrl$ } from './context';

const ListService = {
    getConextInfo(): Observable<string> {
        return ajax({
            url: `${webAbsoluteUrl$.getValue()}/_api/contextinfo`,
            headers: {
                'Accept': 'application/json;odata=nometadata'
            },
            method: "POST"
        }).pipe(
            map((result: any) => {
                return result.response.FormDigestValue;
            })
        );
    },

    addNewItem(itemContent: any, listName: string, formDigestValue: string): Observable<any> {
        const body: string = JSON.stringify(itemContent);
        return ajax({
            url: `${webAbsoluteUrl$.getValue()}/_api/web/lists/GetByTitle('${listName}')/items`,
            body: body,
            headers: {
                'Accept': 'application/json;odata=nometadata',
                'Content-type': 'application/json;odata=verbose',
                'X-RequestDigest': formDigestValue
            },
            method: "POST"
        }).pipe(
            map(result => {
                return result.response;
            })
        );
    },

    updateItem(itemContent: any, listName: string, formDigestValue: string): Observable<any> {
        const body: string = JSON.stringify(itemContent);
        return ajax({
            url: `${webAbsoluteUrl$.getValue()}/_api/web/lists/GetByTitle('${listName}')/items(${itemContent.ID})`,
            body: body,
            headers: {
                'Accept': 'application/json;odata=nometadata',
                'Content-type': 'application/json;odata=verbose',
                'X-RequestDigest': formDigestValue,
                'X-HTTP-Method': 'MERGE',
                'If-Match': '*'
            },
            method: "POST"
        }).pipe(
            map(
                result => {
                    return result.response;
                })
        );
    },

    deleteItem(itemId: number, listName: string, formDigestValue: string): Observable<any> {

        return ajax({
            url: `${webAbsoluteUrl$.getValue()}/_api/web/lists/GetByTitle('${listName}')/items(${itemId})`,
            headers: {
                'Accept': 'application/json;odata=nometadata',
                'Content-type': 'application/json;odata=verbose',
                'X-RequestDigest': formDigestValue,
                'IF-MATCH': '*',
                'X-HTTP-Method': 'DELETE',
            },
            method: "POST"
        }).pipe(
            map(
                result => {
                    return result.response;
                })
        );
    }
};
export {
    ListService,
};