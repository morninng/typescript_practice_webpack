"use strict";



import {Observable} from "./../../node_modules/rxjs/Rx";

class simple_observable{

	constructor();

	KeyupObservable(): void {
		var key$ = Observable.fromEvent(document, 'keyup')
					.do((KeyUp:KeyboardEvent) =>{
						let key = KeyUp.keyCode;
						console.log(key)
					})
		key$.subscribe();
	}

	NetworkObservable(): void{

		const url = "https://fir-2practice.firebaseio.com/Heroes.json";
		const lessonsPromise = fetch(url).then(res =>{
		//	console.log(res.json());
			return res.json();
		})

		const lessons$ = Observable.fromPromise(lessonsPromise);

		lessons$.subscribe(
			lessons => {
				console.log("new lesson", lessons)
			},
			error => {
				console.log("error", error);
			},
			() => {
				console.log("completed");
			}
		);

		/*****lesson 52 map operator****/

		const firstLesson$ = lessons$.map(lessons =>{
			return lessons[0]
			)
		firstLesson$.subscribe(
			lesson => {
				console.log("first lesson is" + lesson);
			}
		)


	}
}


export default simple_observable;