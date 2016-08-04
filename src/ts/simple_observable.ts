"use strict";

import {Observable, Subject  } from "./../../node_modules/rxjs/Rx";

//import {$} from "jquery";

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

	IntervalObservable(): any{

	    const clock$ = Observable.interval(1000);
	    clock$.subscribe(
	      (value)=>{
	        console.log(value);
	        }
	    )
	}

	MouseMove(): void{

		const mouse$ = Observable.fromEvent(document, 'mousemove')
							.filter((move:MouseEvent) =>{
								return move.clientY >=200
							})
							.do((value)=>{
								console.log(value)
							})
							.map((move:MouseEvent)=>{
								let position = 
								{
									x: move.clientX,
									y: move.clientY
								}
								return position;
							});
		mouse$.subscribe(
			(mouse_position) =>{
				console.log("----", mouse_position);
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


	Lig_sub_ob_3(): any{

		const source :any = Observable.create((observer) =>{
			let num :number= 0;
			const id = setInterval(() => {
				observer.next(num++);
			}, 100);

			setTimeout(()=> {
				console.log("call complete");
				observer.complete();
			},1000)

			return () =>{
				console.log("call disposed");
				clearInterval(id);
			}
		})

		const onNext :any = function(num: number){
			console.log("onNext" + num);
		}
		const onError :any = function(error){
			console.log("error" + error);
		}
		const onComplete :any = function(){
			console.log("onComplete");
		}

		const subscription = source.subscribe(onNext, onError, onComplete);

		setTimeout(()=>{
			console.log("unsubscribe");
			subscription.unsubscribe();
		},3000)
	}



	Lig_sub_sub_4(): any{

		const onNext :any = (num: number) =>{
			console.log("onNext" + num);
		}
		const onError :any = (error) =>{
			console.log("error" + error);
		}
		const onComplete :any = () => {
			console.log("onComplete");
		}

		const Sub_obj = new Subject();
		const subscription = Sub_obj.subscribe(onNext, onError, onComplete);

		Sub_obj.next(1);
		Sub_obj.next(1);
		Sub_obj.next(2);
		Sub_obj.next(2);
		Sub_obj.complete();
		Sub_obj.unsubscribe();
	}





}


export default simple_observable;