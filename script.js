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
  
(function init() {
    const cards = document.querySelectorAll('.card');
    fillCards(cards, shuffleEmoji);
    cards.forEach((card) => { card.addEventListener('click', clickEvent); });
}());