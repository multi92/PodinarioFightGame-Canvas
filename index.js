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
//slova za kretanje plejera
const keys = {
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
  w: {
    pressed: false,
  },
};

function animate() {
  //moramo izabrati jednu funkciju koja ce se reloudovati stalno
  //frame po frame reloud sve dok ne kazemo da rikvest stane ici ce u beskonacnost
  window.requestAnimationFrame(animate);
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);
  player.update();
  enemy.update();

  /// stavljamo player.velocity. na x osi na 0 kako bi se player samo pomicao kada ga mi pritisnemo
  player.velocity.x = 0;

  //player funkcija kretanja
  if (keys.a.pressed) {
    player.velocity.x = -1;
  } else if (keys.d.pressed) {
    player.velocity.x = 1;
  }

    //enemy funkcija kretanja ////// moramo staviti ipak lastkey???????????
    if (keys.ArrowLeft.pressed) {
      player.velocity.x = -1;
    } else if (keys.d.pressed) {
      player.velocity.x = 1;
    }
}

animate();

//stavljamo event listner za svaki otkucaj na tastaturi ('keydown')

window.addEventListener("keydown", (event) => {
  switch (event.key) {
    //player igrac

    //pomeranje na desno 1px x osa
    case "d":
      keys.d.pressed = true;
      break;
    //pomeranje na levo 1px x osa
    case "a":
      keys.a.pressed = true;
      break;
    //pomeranje na gore -10px y osa
    case "w":
      player.velocity.y = -10;
      break;

    //enemy igrac

    //pomeranje na desno 1px x osa
    case "ArrowRight":
      keys.ArrowRight.pressed = true;
      break;
    //pomeranje na levo 1px x osa
    case "ArrowLeft":
      keys.ArrowLeft.pressed = true;
      break;
    //pomeranje na gore -10px y osa
    case "ArrowUp":
      enemy.velocity.y = -10;
      break;
  }
  console.log(event);
});

window.addEventListener("keyup", (event) => {
  switch (event.key) {
    case "d":
      keys.d.pressed = false;
      break;

    case "a":
      keys.a.pressed = false;
      break;
    case "w":
      keys.w.pressed = false;
      break;

      //enemy keys
      switch (event.key) {
        case "ArrowRight":
          keys.ArrowRight.pressed = false;
          break;

        case "ArrowLeft":
          keys.ArrowLeft.pressed = false;
          break;
        case "ArrowUp":
          keys.ArrowUp.pressed = false;
          break;
      }
      console.log(event);
  }
});
