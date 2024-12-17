let typeWriter = document.getElementById("type-writer");

let skills = ["Web Developer.", "Web Designer.","Electrical Engineer."];

let typingSpeed = 50;
let word = 0;
let letter = 0;
let skill = "";
let reverse = false;
let interval = null;

interval = setInterval(typeWriterFunction, typingSpeed);

function typeWriterFunction() {
  if (word < skills.length) {
    if (letter < skills[word].length && letter >= 0) {
      if (reverse) {
        skill = skill.substring(0,skill.length-1)
        typeWriter.innerHTML = skill;
        letter--;
      } else {
        skill += skills[word].charAt(letter);
        typeWriter.innerHTML = skill;
        letter++;
      }
    } else {
      if (!reverse) {
          clearInterval(interval);
          setTimeout(()=>{
            typingSpeed = 50;
            reverse = true;
            letter = skills[word].length - 1;
            interval = setInterval(typeWriterFunction, typingSpeed);
        },1000);
      } else {
        clearInterval(interval);
        reverse = false;
        word++;
        letter = 0;
        skill = "";
        typingSpeed = 50;
        interval = setInterval(typeWriterFunction, typingSpeed);
      }
    }
  } else {
    letter = 0;
    word = 0;
  }
}

window.onscroll= function(event){
  const scroll = window.scrollY;
  const header  = document.getElementById("header");
  const heroSection  = document.getElementById("hero-section");
  if(scroll > 150){
      header.classList.add("fix-header");
      heroSection.style.marginTop = "108px";
      header.style.opacity = 1;
  }
  else if(scroll > 100 && scroll < 150){
    header.style.opacity = 0;
  }
  else{
    header.style.opacity = 1;
    heroSection.style.marginTop = "0px";
    header.classList.remove("fix-header");
  }
}

let selected = 0;

const list = Array.from(document.getElementsByClassName("resume-section-list"));
const listItems = Array.from(document.getElementsByClassName("resume-list-item"));

list.forEach((el,index)=>{
  el.classList.remove("active-list");
  if(index == selected){
    el.classList.add("active-list");
  }
})

listItems.forEach((el,index)=>{
  el.style.display = "none";
  if(index == selected){
    el.style.display = "grid";
  }
})

function onListChange(num){
  selected = num;
  list.forEach((el,index)=>{
    el.classList.remove("active-list");
    if(index == selected){
      el.classList.add("active-list");
    }
  })
  listItems.forEach((el,index)=>{
    el.style.display = "none";
    if(index == selected){
      el.style.display = "grid";
    }
  })
}

// hamburger

function change(){
  document.getElementById("hamburger").classList.toggle("change-sign");
  document.getElementById("nav-items").classList.toggle("hide-nav");
  document.getElementById("cross").classList.toggle("change-sign");
}

document.getElementById("responsive-nav").addEventListener('click',change)

document.getElementById("nav-items").addEventListener('click',change);

