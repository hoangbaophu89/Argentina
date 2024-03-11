import { BehaviorSubject, Observable, of } from "rxjs";
import { ajax } from "rxjs/ajax";
import { map, switchMap, take } from "rxjs/operators";
import { webAbsoluteUrl$ } from "./context";
import { ClassModel } from "../models/Class";

const msGraphClientFactory$: BehaviorSubject<any> = new BehaviorSubject<any>(
  null
);

const GraphAPIService = {
  getMyCountry(): Promise<any> {
    let msGraphClientFactory = msGraphClientFactory$.getValue();
    if (msGraphClientFactory) {
      return msGraphClientFactory.getClient("3").then((graphClient) => {
        return graphClient.api(`me/country`).get();
      });
    }
  },
};
export { GraphAPIService, msGraphClientFactory$ };
