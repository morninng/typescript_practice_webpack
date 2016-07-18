"use strict";

import {Observable} from "./../../node_modules/rxjs/Rx";

class simple_observable{

	constructor(){};

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
			return lessons[0];
		})
		firstLesson$.subscribe(
			lesson => {
				console.log("first lesson is" + lesson);
			}
		)

	}

		/*****lesson 53 combine multiple observable****/

	MouseMoveClickObservable(): void{

		const click$ = Observable.fromEvent(document, 'click')
							.do((click:MouseEvent)=>{
								console.log("clicked" , click.clientY);
							});
		const mouse$ = Observable.fromEvent(document, 'mousemove')
							.filter((move:MouseEvent) =>{
								return move.clientY >=200
							});
		const combined$ = Observable.combineLatest(mouse$, click$);
		combined$.subscribe(
			(combined) =>{
				console.log(combined[0]);
			}
		);
	}

	ArrayObservable(): any{
		const num_arr$ = Observable.from([1,2,3,4,5,6,7,8])
			.filter((index: number) : boolean => (index % 2) ==0)
			.map( (num) : number =>{ return num*2});

			num_arr$.subscribe(num =>{
				console.log(num);
			});
	}

	Lig_sub_ob(): any{

/* implementation of this way is not possible any more

		const observer = observer.create(
			(num) : any =>{
				return console.log("onNext:" + num);
			},
			(error) => {
				return console.log("onError" + error);
			},
			() => {
				return console.log("oncompleted");
			}
		);
*/
		const observable = Observable.from([1,2,3,4,5,6,7,8])
			.filter((index: number) : boolean => (index % 2) ==0)
			.map( (num) : number =>{ return num*2});
		
		observable.subscribe(
			(num) : any =>{
				return console.log("onNext:" + num);
			},
			(error) => {
				return console.log("onError" + error);
			},
			() => {
				return console.log("oncompleted");
			}
		);


	}


	Lig_sub_ob_2(): any{

		const observable = Observable.from([1,2,3,4,5,6,7,8])
			.filter((index: number) : boolean => (index % 2) ==0)
			.map( (num) : number =>{ return num*3});
		
		
		let onNext : any = function(num){
			return console.log("onNext:" + num);
		}
		let onError : any = function(error){
			return console.log("onError" + error);
		}
		let onComplete : any = function(){
			return console.log("oncompleted");
		}

		observable.subscribe(onNext,onError, onComplete);

	}





}


export default simple_observable;