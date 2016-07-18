"use strict";

/**
 *
 */
class Person {

  constructor(private name: string = 'contact', public extention = "!!!!") {

  }

  /**
   *
   */
  public say(): void {
    console.log(`Hello, 1st ${this.name}${this.extention}`);
  }
}

export default Person;