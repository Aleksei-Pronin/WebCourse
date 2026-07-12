"use strict";

(function () {
    class Animal {
        constructor(name) {
            this.name = name;
        }

        speak() {
            console.log(`${this.name} издает звук`);
        }
    }

    class Cat extends Animal {
        speak() {
            console.log(`${this.name} мяукает`);
        }
    }

    class Dog extends Animal {
        speak() {
            console.log(`${this.name} гавкает`);
        }
    }

    const animal = new Animal("Животное");
    animal.speak();

    const cat = new Cat("Кот");
    cat.speak();

    const dog = new Dog("Собака");
    dog.speak();
})();