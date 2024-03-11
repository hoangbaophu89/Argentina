import { BehaviorSubject, Observable, of } from "rxjs";
import { ajax } from "rxjs/ajax";
import { map, switchMap, take } from "rxjs/operators";
import { webAbsoluteUrl$ } from "./context";
import { ClassModel } from "../models/Class";

const selecteColumn = `$select=Title`;

const MainService = {
  getAllClass(): Observable<ClassModel[]> {
    return ajax({
      url: `${webAbsoluteUrl$.getValue()}/_api/web/lists/GetByTitle('Class')/items?${selecteColumn}`,
      headers: {
        Accept: "application/json;odata=nometadata",
      },
    }).pipe(
      map((result: any) => {
        return result.response.value;
      })
    );
  },
};
export { MainService };
