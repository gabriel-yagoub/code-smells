/*
  1. Se om du kan hitta två stycken code smells i följande funktion och rätta till dem.
  Funktionen tar emot en lista med längshoppslängder och syftet med funktionen är att summera
  dessa hopplängder.
  */

/*// Gamla koden
function getLength(jumpings: number[]): number {
  let totalNumber = 0;

  totalNumber = jumpings.reduce(
    (jumpDistanceSoFar, currentJump) => jumpDistanceSoFar + currentJump
  );

  return totalNumber;
}
*/

///// Nya koden /////
function getLength(jumpings: number[]): number {
  return jumpings.reduce((jumpDistanceSoFar, currentJump) => jumpDistanceSoFar + currentJump, 0);
}


/*
  2. I detta exempel har vi fokuserat på if-statements. Se om du kan göra exemplet bättre!
  */

/*// Gamla koden ////

class Student {
  constructor(
    public name: string,
    public handedInOnTime: boolean,
    public passed: boolean
  ) {}
}

function getStudentStatus(student: Student): string {
  student.passed =
    student.name == "Sebastian"
      ? student.handedInOnTime
        ? true
        : false
      : false;

  if (student.passed) {
    return "VG";
  } else {
    return "IG";
  }
}

*/

///// Nya koden /////

class Student {
  constructor(
    public name: string,
    public handedInOnTime: boolean,
    public passed: boolean
  ) {}
}

function lateStudent(student: Student): string {
  if(student.name == "Sebastian" && student.handedInOnTime && student.passed) {
  return "VG";
  } else {
    return "IG";
  }
};





/*
  3. Variabelnamn är viktiga. Kika igenom följande kod och gör om och rätt.
  Det finns flera code smells att identifiera här. Vissa är lurigare än andra.
  */

/*// Gamla koden ////
class Temp {
  constructor(public q: string, public where: Date, public v: number) {}
}

function averageWeeklyTemperature(heights: Temp[]) {
  let r = 0;

  for (let who = 0; who < heights.length; who++) {
    if (heights[who].q === "Stockholm") {
      if (heights[who].where.getTime() > Date.now() - 604800000) {
        r += heights[who].v;
      }
    }
  }

  return r / 7;
}
*/

///// Nya koden /////

class Temp {
  constructor(public nameOfCity: string, public dateWhenTempMeasured: Date, public temperature: number) {}
}

const daysInWeek = 7;
const millisecondsInWeek = 604800000;
let sumOfTemperatures = 0;

function averageWeeklyTemperature(temperatures: Temp[]) {
  for (let i = 0; i < temperatures.length; i++) {
    if (temperatures[i].nameOfCity === "Stockholm") {
      if (temperatures[i].dateWhenTempMeasured.getTime() > Date.now() - millisecondsInWeek) {
        sumOfTemperatures += temperatures[i].temperature;
      }
    }
  }
  return sumOfTemperatures / daysInWeek;
};

/*

BONUS! Expriementerade nedan med att använda array-metoder istället för for-loopar, tror att denna funkar också (?)

class Temp {
  constructor(public city: string, public date: Date, public temperature: number) {}
}

function averageWeeklyTemperature(temperatures: Temp[]): number {
  const daysInWeek = 7;
  const millisecondsInWeek = 604800000;

  const sumOfTemperatures = temperatures
    .filter((temp) => temp.city === "Stockholm" && temp.date.getTime() > Date.now() - millisecondsInWeek)
    .reduce((sum, temp) => sum + temp.temperature, 0);

  return sumOfTemperatures / daysInWeek;
}

*/


/*
  4. Följande funktion kommer att presentera ett objekt i dom:en. 
  Se om du kan göra det bättre. Inte bara presentationen räknas, även strukturer.
  */

/*// Gamla koden ////  
function showProduct(
  name: string,
  price: number,
  amount: number,
  description: string,
  image: string,
  parent: HTMLElement
) {
  let container = document.createElement("div");
  let title = document.createElement("h4");
  let pris = document.createElement("strong");
  let imageTag = document.createElement("img");

  title.innerHTML = name;
  pris.innerHTML = price.toString();
  imageTag.src = image;

  container.appendChild(title);
  container.appendChild(imageTag);
  container.appendChild(pris);
  parent.appendChild(container);
}
*/

///// Nya koden /////
class Product {
  constructor(
    public name: string, 
    public price: number, 
    public amount: number, 
    public description: string, 
    public image: string) {}
}

function showProduct(product: Product, parent: HTMLElement) { 
  let container = document.createElement("div");
  let title = document.createElement("h4");
  let price = document.createElement("strong");
  let imageTag = document.createElement("img");

  title.innerHTML = product.name;
  price.innerHTML = product.price.toString();
  imageTag.src = product.image;

  container.appendChild(title);
  container.appendChild(imageTag);
  container.appendChild(price);
  parent.appendChild(container);
}




/*
  5. Följande funktion kommer presentera studenter. Men det finns ett antal saker som 
  går att göra betydligt bättre. Gör om så många som du kan hitta!
  */

/*// Gamla koden ////
function presentStudents(students: Student[]) {
  for (const student of students) {
    if (student.handedInOnTime) {
      let container = document.createElement("div");
      let checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = true;

      container.appendChild(checkbox);
      let listOfStudents = document.querySelector("ul#passedstudents");
      listOfStudents?.appendChild(container);
    } else {
      let container = document.createElement("div");
      let checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = false;

      container.appendChild(checkbox);
      let listOfStudents = document.querySelector("ul#failedstudents");
      listOfStudents?.appendChild(container);
    }
  }
}
*/


///// Nya koden /////
function presentStudents(students: Student[]) {
  for (const student of students) {
    const container = document.createElement("div");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = student.handedInOnTime;

    container.appendChild(checkbox);
    const listId = student.handedInOnTime ? "passedstudents" : "failedstudents";
    const listOfStudents = document.querySelector(`ul#${listId}`);

    if (listOfStudents) {
      listOfStudents.appendChild(container);
    } else {
      console.error(`Could not find student list with ID ${listId}`);
    }
  }
}




/*
  6. Skriv en funktion som skall slå ihop följande texter på ett bra sätt:
  Lorem, ipsum, dolor, sit, amet
  Exemplet under löser problemet, men inte speciellt bra. Hur kan man göra istället?
  */

/*// Gamla koden ////  
function concatenateStrings() {
  let result = "";
  result += "Lorem";
  result += "ipsum";
  result += "dolor";
  result += "sit";
  result += "amet";

  return result;
}
*/

///// Nya koden /////
function concatenateStrings() {
  const strings = ["Lorem", "ipsum", "dolor", "sit", "amet"];
  return strings.join(" ");
}



/* 
7. Denna funktion skall kontrollera att en användare är över 20 år och göra någonting.
    Det finns dock problem med denna typ av funktion. Vad händer när kraven ändras och
    fler och fler parametrar behöver läggas till? T.ex. avatar eller adress. Hitta en bättre
    lösning som är hållbar och skalar bättre. 
*/

/*// Gamla koden ////
function createUser(
  name: string,
  birthday: Date,
  email: string,
  password: string
) {
  // Validation

  let ageDiff = Date.now() - birthday.getTime();
  let ageDate = new Date(ageDiff);
  let userAge = Math.abs(ageDate.getUTCFullYear() - 1970);

  console.log(userAge);

  if (!(userAge < 20)) {
    // Logik för att skapa en användare
  } else {
    return "Du är under 20 år";
  }
}
*/

/*
//BONUS! Expriementerade nedan med att använda en funktion istället för en klass, tror att denna funkar också (?)
function createUser2(
  name: string,
  birthday: Date,
  email: string,
  password: string
): string {
  // Calculate user age
  const userAge = calculateUserAge(birthday);

  // Age check
  if (userAge < 20) {
    return "You must be at least 20 years old to create an account.";
  }
  return "User created successfully!";
}

function calculateUserAge(birthday: Date): number {
  const ageDiff = Date.now() - birthday.getTime();
  const ageDate = new Date(ageDiff);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}
*/

///// Nya koden /////
class User {
  constructor(
    public name: string,
    public birthday: Date,
    public email: string,
    public password: string
  ) {}
};

function createUser(user: User): string {
  const ageDiff = Date.now() - user.birthday.getTime();
  const ageDate = new Date(ageDiff);
  const userAge = Math.abs(ageDate.getUTCFullYear() - 1970);

  if (userAge < 20) {
    return "You must be at least 20 years old to create an account.";
  }
  return "User created successfully!";
}

/*

// Testade koden på nedanstående sätt, fungerar som det ska!
const ungGabriel = createUser(new User("Gabriel", new Date("2022-01-01"), "hej@mail.com", "123456"));

console.log(ungGabriel); // "You must be at least 20 years old to create an account."

const gammalGabriel = createUser(new User("Gabriel", new Date("1990-01-01"), "hej@mail.com", "123456"));

console.log(gammalGabriel); // "User created successfully!" 

*/