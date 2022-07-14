//dom selekcija canvas kontejnera u index.html
const canvas = document.querySelector("canvas");
//stavljamo konstantu c u 2d rezimu
const c = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

//crtanje pravougaonika na x, y osi sa datom sirinom i visinom
c.fillRect(0, 0, canvas.width, canvas.height);
//dodavanje gravitacije kako bi objekat sporije padao na tlo
const gravity = 0.2;

class Sprite {
  constructor({ position, velocity }) {
    this.position = position;
    this.velocity = velocity;
    this.height = 150;
  }
  //crtanje pravougaonika(igraca) i stavljanja u poziciju x, y
  draw() {
    c.fillStyle = "red";
    c.fillRect(this.position.x, this.position.y, 50, this.height);
  }
  //updejtujemo prvobitni pravougaonik
  update() {
    //hvatamo draw funkciju iznad
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (this.position.y + this.height + this.velocity.y >= canvas.height) {
      this.velocity.y = 0;
    } else this.velocity.y += gravity;
  }
}
//prvi igrac
const player = new Sprite({
  position: { x: 0, y: 0 },
  velocity: { x: 0, y: 0 },
});

//drugi igrac
const enemy = new Sprite({
  position: { x: 400, y: 100 },
  velocity: { x: 0, y: 0 },
});

function animate() {
  //moramo izabrati jednu funkciju koja ce se reloudovati stalno
  //frame po frame reloud sve dok ne kazemo da rikfest stane ici ce u beskonacnost
  window.requestAnimationFrame(animate);
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);
  player.update();
  enemy.update();
}

animate();


//////Ovde smo stali//////

//stavljamo event listner za svaki otkucaj na tastaturi ('keydown')

window.addEventListener("keydown", (event) => {
  //slucaj 1- ukoliko pritisnemo na tastaturi slovo d player se treba pomeriti 1px na x osi
  switch (event.key) {
    case "d":
      player.velocity.x = 1;
      break;
    case "a":
      player.velocity.x = -1;
      break;
  }
  console.log(event);
});

window.addEventListener("keyup", (event) => {
  //slucaj 2 - ukoliko pritisnemo na tastaturi slovo d player se treba pomeriti 1px  na x osi uvek kada pritisnemo dugme
  switch (event.key) {
    case "d":
      player.velocity.x = 0;
      break;
    //kada hocemo da se player pomera u levo
    case "a":
      player.velocity.x = 0;
      break;
  }
  console.log(event);
});
