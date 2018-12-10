public class Duck {
  public void makeSound(){
    system.out.println('gagaga')
  }
}
public class Cat{
  public void makeSound(){
    system.out.println('miaomiaomaio')
  }
}
public class AnimalSound{
  public void makeSound(Duck duck){
    duck.makeSound()
  }
}
public class Test() {
  public static void main(String args[]){
    AnimalSound animalSound = new AnimalSound()
    Duck duck = new Duck()
    animalSound.makeSound(duck)
  }
}


public abstract class Animal{
  abstract void makeSound() {
    
  }
}

public class Chichen extends Animal{
  public void makeSound(){
    system.println("jijiji")
  }
}

public class Duck extends Animal{
  public void makeSound(){
    system.println('gagaga')
  }
}

Animal duck = new Duck();
Animal chichen = new Chichen();

public class AnimalSound{
  public void makeSound(Animal animal){
    animal.makeSound()
  }
}
public class Test{
  public static void main(String args[]){
    AnimalSound animalSound = new AnimalSound();
    Animal duck = new Duck();
    Animal chichen = new Chichen();
    animalSound.makeSound(duck);
    animalSound.makeSound(chichen)
  }
}










