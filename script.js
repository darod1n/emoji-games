function shuffleEmoji(arr){
    return arr.sort(() => Math.random()-0.5);
}
  
(function init() {
    const emoji = '💀 ☠️ 👽 👾 🤖 🎃'.split(' ')
    const cards = document.querySelectorAll('.card');
    fillCards(cards, shuffleEmoji);
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