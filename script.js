function shuffleEmoji(arr){
    return arr.sort(() => Math.random()-0.5);
}

function coupleArr(arr){
    return [].concat(arr, arr);
}

function fillCards(cards, emoji){
    cards.forEach((card, index)=>{card.textContent = emoji[index]});
}
  
(function init() {
    const emoji = '💀 ☠️ 👽 👾 🤖 🎃'.split(' ')
    const cards = document.querySelectorAll('.card');
    const shuffleArr = shuffleEmoji(coupleArr(emoji));
    fillCards(cards, shuffleArr);
    cards.forEach((card) => { card.addEventListener('click', clickEvent); });
}());

function clickEvent() {
    const opened = this.classList.contains('open');
    if (!opened) {
      this.classList.remove('close');
      this.classList.add('open');
    } else {
      this.classList.remove('open');
      this.classList.add('close');
    }
}