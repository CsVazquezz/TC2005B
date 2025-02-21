document.getElementById("exercise1").onclick = function () {
  let num = prompt("Ingrese un número:");
  let output =
    "<h3>Tabla de Potencias</h3><table border='1'><tr><th>Número</th><th>Cuadrado</th><th>Cubo</th></tr>";
  for (let i = 1; i <= num; i++) {
    output += `<tr><td>${i}</td><td>${i ** 2}</td><td>${i ** 3}</td></tr>`;
  }
  output += "</table>";
  document.getElementById("output").innerHTML = output;
};

document.getElementById("exercise2").onclick = function () {
  let num1 = Math.floor(Math.random() * 10);
  let num2 = Math.floor(Math.random() * 10);
  let startTime = Date.now();
  let answer = prompt(`¿Cuánto es ${num1} + ${num2}?`);
  let endTime = Date.now();
  let correct = answer == num1 + num2 ? "Correcto" : "Incorrecto";
  let timeTaken = (endTime - startTime) / 1000;
  document.getElementById("output").innerHTML =
    `<p>${correct}. Tiempo: ${timeTaken} segundos.</p>`;
};

document.getElementById("exercise3").onclick = function () {
  let arr = [-3, 0, 5, -1, 2, 0, -4];
  let neg = arr.filter((n) => n < 0).length;
  let zeros = arr.filter((n) => n === 0).length;
  let pos = arr.filter((n) => n > 0).length;
  document.getElementById("output").innerHTML =
    `<p>Negativos: ${neg}, Ceros: ${zeros}, Positivos: ${pos}</p>`;
};

document.getElementById("exercise4").onclick = function () {
  let matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];
  let averages = matrix.map(
    (row) => row.reduce((a, b) => a + b, 0) / row.length
  );
  document.getElementById("output").innerHTML =
    `<p>Promedios: ${averages.join(", ")}</p>`;
};

document.getElementById("exercise5").onclick = function () {
  let num = prompt("Ingrese un número:");
  let reversed = num.split("").reverse().join("");
  document.getElementById("output").innerHTML =
    `<p>Número invertido: ${reversed}</p>`;
};

document.getElementById("exercise6").onclick = function () {
  class Persona {
    constructor(nombre, edad) {
      this.nombre = nombre;
      this.edad = edad;
    }
    saludar() {
      return `Hola, soy ${this.nombre} y tengo ${this.edad} años.`;
    }
    esMayor() {
      return this.edad >= 18 ? "Soy mayor de edad." : "Soy menor de edad.";
    }
  }
  let nombre = prompt("Ingrese su nombre:");
  let edad = prompt("Ingrese su edad:");
  let persona = new Persona(nombre, edad);
  document.getElementById("output").innerHTML =
    `<p>${persona.saludar()} ${persona.esMayor()}</p>`;
};
