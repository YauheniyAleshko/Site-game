const cards = document.querySelectorAll('.play__card');
const playZone = document.querySelector('.dot');
let span = document.querySelector('.vstavka');
let hasFlippedCard = false;
let tableBlock = false;
let firstCard, secondCard;
let counter1, counter2, counter;
counter = counter1 = counter2 = 0;

const flipCard = e =>{
  if(tableBlock) return;

  const target = e.target.parentElement;

  if(target === firstCard) return;
  
  target.classList.add("flip");

  //console.log(target.dataset.item)

  if(!hasFlippedCard) {
    
    hasFlippedCard = true;
    firstCard = target;
  }else {
    hasFlippedCard = false;
    secondCard = target;

    checkSimilarity();
  }
};

const checkSimilarity = () => {
  if(firstCard.dataset.item === secondCard.dataset.item){
     firstCard.removeEventListener("click", flipCard);
     secondCard.removeEventListener("click", flipCard);
     playZone.style.pointerEvents = "none";
     counter1++;
     setTimeout(() => {
      firstCard.style.opacity = 0;
      secondCard.style.opacity = 0;
      playZone.style.pointerEvents = "auto";
    },1000);

  } else {
    
    tableBlock = true;
    counter2++;
    setTimeout(() => {
      firstCard.classList.remove("flip");
      secondCard.classList.remove("flip");
      resetTable();
    },1000);
  };
  counter = counter1+counter2;
  //console.log(counter);
  showModal();
};
  
const resetTable = () => {
  hasFlippedCard = tableBlock = false;
  firstCard = secondCard = null;
};


cards.forEach(card =>{
  card.addEventListener('click', flipCard);

  const randomNumber = Math.floor(Math.random()*cards.length);
  card.style.order = randomNumber;
});

let modalWin = document.querySelector('.modal');

const showModal = () => {
  if (counter1 == 8){
    modalWin.style.display = 'block';
    span.innerHTML = counter;
    let close = modalWin.querySelector('.close_modal_window');
    close.addEventListener('click', function(){
      modalWin.style.display = "none";
    });
  }else return;
};

//Menu burger
const hamb = document.querySelector('.hamb');
const popup = document.querySelector('.popup');
const body = document.body;

hamb.addEventListener('click',hambEvent);

function hambEvent(e){
  e.preventDefault();
  popup.classList.toggle('open');
  hamb.classList.toggle('active');
  body.classList.toggle('noscroll');
}




