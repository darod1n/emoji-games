const enumStatus = {
    CLOSE: 'сlose',
    OPEN: 'open',
    SUCCESS: 'success',
    WRONG: 'wrong',
};

class GameProcess{
    constructor({emojiList, cardsField, cardElems}){
        //создаем массив парных изображений
        this.emojiList = this.coupleEmoji(emojiList);
        this.cardsField = cardsField;
        this.cardElems = cardElems;
        this.cardsList = [];
        this.initCards();
    }
    coupleEmoji(emojiList){
        const arr = emojiList.map((emoji, id) => ({
            emoji, id,
        }));
        return arr.concat(arr);
    }
    initCards(){
        //перемешиваем массив
        this.shuffleEmoji()
    }
    shuffleEmoji(){
        this.emojiList = this.emojiList.sort(() => Math.random() - 0.5)
    }
}

function shuffleArr(arr){
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
    const shuffleEmoji = shuffleArr(coupleArr(emoji));
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