import { Observable } from "./observable";

// se crea un observable
const miObs = new Observable<number>();
// se subscribe al observable en 3 instancias distintas, obteniendo 3 observadores independientes
const observer1 = miObs.subscribe(x => console.log(`Valor desde observer1: ${x}`));
const observer2 = miObs.subscribe(x => console.log(`Valor desde observer2: ${x}`));
const observer3 = miObs.subscribe(x => console.log(`Valor desde observer3: ${x}`));
// se cambia el valor del observable a 5
miObs.next(5);
// se desuscribe el primer observador
miObs.unSubscribe(observer1);
// se cambia el valor del observable a 3
miObs.next(3);

// ---------------------------
// Notas: 
// 1. Si se entrega un valor inicial al observable, se infiere su tipo.
new Observable<string>();        // se explicita que es un observable de tipo string
new Observable("Primer mensaje") // se infiere que es un observable de tipo string.
new Observable();                // se infiere que es de tipo {}. CUIDADO!

// 2. Se puede definir que cuando se realice una subscripción, se gatilla
//    automáticamente la lógica del observable resultante.

const o1 = new Observable(1, true);
const o2 = new Observable(2);       // el segundo parámetro es falso por defecto

o1.subscribe(x => console.log(x));
o2.subscribe(x => console.log(x));
// en consola se imprime sólo "1". No se gatilla la lógica del segundo observador
// porque por defecto ocurre sólo cuando el observable cambia su valor.

o2.next(22);
// en consola: 22

o1.subscribe(x => console.log(`número: ${x}`));
// en consola: número: 1

o2.subscribe(x => console.log(`número: ${x}`));
// no ocurre nada