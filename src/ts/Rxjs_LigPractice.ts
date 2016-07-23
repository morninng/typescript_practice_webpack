"use strict";

import {Observable, BehaviorSubject } from "./../../node_modules/rxjs/Rx";
//import {TimelineLite} from "./../../node_modules/gsap/src/minified/TimelineLite.min";
import * as $ from "jquery";

class Rxjs_LigPractice{

	constructor(){};

	lig_practice_1_drag = function() {

		const box_element = document.getElementById("box");
		const mouseup_event = Observable.fromEvent(box_element, 'mouseup');
		const mousemove_event = Observable.fromEvent(box_element, 'mousemove');
		const mousedown_event = Observable.fromEvent(box_element, 'mousedown');

		const source = mousedown_event.flatMap( (event : MouseEvent) => {
			
			let start_pageX = event.pageX;
			let start_pageY = event.pageY;
			let start_left = box_element.offsetLeft;
			let start_top = box_element.offsetTop;
			console.log("start x" , start_pageX , 'start y' , start_pageY);
			console.log("start box left" , start_left , 'start box top' , start_top);
			box_element.className = "hovering";

			return mousemove_event.map((e : MouseEvent)=>{
				console.log("mouse x" , e.pageX , "mouse y" , e.pageY)
				return {
					left: start_left + (e.pageX - start_pageX),
					top: start_top + (e.pageY - start_pageY)
				};
			}).takeUntil(mouseup_event);
		});

		mouseup_event.subscribe(
			()=>{
				box_element.className = null;
			}
		);



		source.subscribe((pos)=>{
			console.log("pos X" , pos.left , "pos y" , pos.top);
			console.log("left", box_element.style.left , "top", box_element.style.top  )
			box_element.style.left = String(pos.left) + "px";
			box_element.style.top = String(pos.top) + "px";
			console.log("---------------");
		})
		
	}


	lig_practice_2_databind = function() {

/*
how to retrieve element under some element
http://stackoverflow.com/questions/7815374/get-element-inside-element-by-class-and-id-javascript
*/ 
		const text_input_element
		      = document.getElementById("text_container").getElementsByTagName("input")[0];
		const rx_txt_sub = new BehaviorSubject(text_input_element.value);

		const size_input_element
		      = document.getElementById("size_container").getElementsByTagName("input")[0];
		const rx_size_sub = new BehaviorSubject(size_input_element.value);

		const color_input_element
		      = document.getElementById("color_container").getElementsByTagName("input")[0];
		const rx_color_sub = new BehaviorSubject(size_input_element.value);



		const text_textbind = document.getElementById("text_bind");

		rx_txt_sub.subscribe((val)=>{
			text_textbind.innerText = val;
		})
		rx_size_sub.subscribe((val)=>{
			text_textbind.style.fontSize = val + "px";
		})
		rx_color_sub.subscribe((val)=>{
			text_textbind.style.color = val;
		})

		const bind = function(eType, elem, subject){
			Observable.fromEvent(elem, eType).subscribe( (e : KeyboardEvent)=>{
				subject.next(e.target.value);
			})
		}
		bind('keyup',text_input_element, rx_txt_sub);
		bind('change',size_input_element, rx_size_sub);
		bind('change',color_input_element, rx_color_sub);
	}

	lig_practice_3_game = function() {

		const keydown_observable = Observable.fromEvent(document, 'keydown');
		const create_command = function(combination_key_arr, timeout : number, skill_execute){
			const get_source = () =>{
				let source = Observable.empty();
				combination_key_arr.forEach((keyCode, index)=>{
					let this_key_source = keydown_observable.filter((e: KeyboardEvent)=>{
						let is_collect = (e.keyCode === keyCode);
						if(is_collect === false){
							throw Error('incorrect key pressed');
						}else{
							return true;
						}
					}).take(1);
					if(index > 0){
						this_key_source = this_key_source.timeout(timeout);
					}
					source = source.concat(this_key_source);
				})
				return source;
			};


			const watch = function(){
				const source = get_source();
				source.subscribe(
					(e : KeyboardEvent)=>{
						console.log(e.keyCode);
						console.log("correct");
					},
					(error)=>{
						console.log(error.message);
						watch();
					},
					()=>{
						console.log("completed");
						watch();
						skill_execute();
					}
				)
			};
			watch();
		}

//https://developer.mozilla.org/ja/docs/Web/API/element/classList
//https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/jquery/jquery.d.ts
// http://dx.24-7.co.jp/flash-like-js-animation/
// hadoken_timeline

		let $ken = $('.ken');
		const $stage = $('.stage');
		let $fireball = null;
		const hadoken_init = function(){
			$fireball = $('<div class = "fireball"></div>');
			$ken.addClass('hadoken');
			$stage.append($fireball);
			console.log("hadoken init");
		}

		const hadoken_first = function(){
			$fireball.addClass('moving').animate({
				left: '+=250'
			},3000, "linear");
			console.log("hadoken first");
		}

		const hadoken_second = function(){
			$ken.removeClass("hadoken");
			console.log("hadoken_second");
		}

		const hadoken_third = function(){
			$fireball.addClass('explode');
			console.log("hadoken third");
		}
		const hadoken_timeline = [
			{ "animation": hadoken_init, "interval": 100 },
			{ "animation": hadoken_first, "interval": 1000 },
			{ "animation": hadoken_second, "interval": 1000 },
			{ "animation": hadoken_third, "interval": 1500 },
		]

		interface timeline_context{
			animation : string,
			interval : number
		};

		const execute_animation = (timeline) =>{
			let interval_sum = 0;
			let len = timeline.length;
			for(var i=0; i<len; i++){
				setTimeout(timeline[i].animation, interval_sum);
				interval_sum = interval_sum + timeline[i].interval;
			}
		}

		const skill = {
			hadoken : () => {
				console.log("execute hadoken");
				execute_animation(hadoken_timeline);
			},
			senpukyaku: ()=>{
			}
		};
		let keys = {left: 37,right: 39,	up: 38,	down: 40,a: 65,	s: 83};
		create_command([keys.left, keys.down, keys.right, keys.a], 500, skill.hadoken);
		//create_command([keys.right, keys.down, keys.left, keys.s], 500, skill.senpukyaku);
	}

}


export default Rxjs_LigPractice;