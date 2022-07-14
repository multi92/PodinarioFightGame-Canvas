//dom selekcija canvas kontejnera u index.html
const canvas = document.querySelector("canvas");
//stavljamo konstantu c u 2d rezimu
const c = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height);

class Sprite {
  constructor({ position, velocity }) {
    this.position = position;
    this.velocity = velocity;
  }
  //crtanje pravougaonika(igraca) i stavljanja u poziciju x, y
  draw() {
    c.fillStyle = "red";
    c.fillRect(this.position.x, this.position.y, 50, 150);
  }
  //updejtujemo prvobitni pravougaonik
  update() {
    //hvatamo draw funkciju iznad
    this.draw();
      this.position.y += this.velocity.y;
  }
}
//prvi igrac
const player = new Sprite({
  position: { x: 0, y: 0 },
  velocity: { x: 0, y: 10 },
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
