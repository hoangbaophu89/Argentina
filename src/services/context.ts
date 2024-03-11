import { BehaviorSubject } from 'rxjs';


const webAbsoluteUrl$: BehaviorSubject<string> = new BehaviorSubject<string>('http://localhost:8181');


export {
    webAbsoluteUrl$
};