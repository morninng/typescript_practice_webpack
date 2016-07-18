"use strict";



import {Observable} from "./../../node_modules/rxjs/Rx";

class simple_observable{

	constructor();

	initObservable(): void {

		var key$ = Observable.fromEvent(document, 'keyup')
					.do((KeyUp:KeyboardEvent) =>{
						let key = KeyUp.keyCode;
						console.log(key)
					})
		key$.subscribe();
		
	}

}

export default simple_observable;