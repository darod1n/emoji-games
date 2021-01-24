const enumStatus = {
    CLOSE: 'сlose',
    OPEN: 'open',
    SUCCESS: 'success',
    WRONG: 'wrong',
};

function secondToTime(s){
    const minutes = Math.floor(s / 60);
    const _seconds = s % 60;
    const secondsFormat = _seconds < 10 ? `0${_seconds}` : _seconds.toString();
    return `${minutes}:${secondsFormat}`;
}

class GameProcess{
    constructor({emojiList, cardsField, cardElems, timerNode, alertNode}){
        //создаем массив парных изображений
        this.emojiList = this.coupleEmoji(emojiList);
        this.cardsField = cardsField;
        this.cardElems = cardElems;
        this.cardsList = [];
        this.initCards();
        this.initEvents();
        this.timerNode = timerNode;
        this.alertNode = alertNode;
        this.timerOpts = {
            seconds: 1,
        }
        this.init();
    }
    init(){
        this.initCards();
        this.initEvents();
        this.setTime(this.timerOpts.seconds);
    }
    initTimer(){
        let {seconds} = this.timerOpts;
        this.timeId = setInterval(() => {
            seconds--;
            this.setTime(seconds);
            if(!seconds){
                this.endGame(false);

            }
        }, 1000);
    }
 
    clearContext(){
        this.gameStarted = false;
        ['win', 'lose'].forEach((i) => {
            this.alertNode.querySelector(`.${i}`).classList.add('invisible');
        });
        this.alertNode.classList.add('invisible');
    }

    setTime(){
        this.timerNode.textContent = secondToTime(seconds);
    }
    initEvents(){
        //обрабатываем клик в cards
        this.cardsField.addEventListener('click', ({target}) => {
            //если клик сделали по карточке
            if (target.classList.contains('card')){
                const cardIdx = this.cardElems.index0f(target);
                const card = this.cardsList[cardIdx];
                if (card.getStatus() === enumStatus.CLOSE){
                    this.closeWrong();
                    this.checkCards(card);
                }
            }
        });
    }
    closeWrong(){
        this.cardsList.filter(
            (x) => x.getStatus() === enumStatus.WRONG
        ).forEach((x) => x.close());
    }
    restartGame(){
        this.cardsList.forEach((x) => x.close());
        this.initCards();
        this.setTime(this.timerOpts.seconds);
        this.clearContext();
    }
    endGame(win){
        clearInterval(this.timeId);
        const status = win ? 'win' : 'lose';
        const btnText = win ? 'Играть снова' : 'Попробовать снова';
        this.alertNode.querySelector('.alert__button').textContent = btnText;
        this.alertNode.querySelector(`.${status}`).classList.remove('invisible');
        this.alertNode.classList.remove('invisible');
    }
    checkCards(card){
        if (!this.gameStarted){
            this.gameStarted = true;
            this.initTimer();
        }
        const findOpenCard = this.cardsList.find((x) => x.getStatus() === enumStatus.OPEN);
        if (findOpenCard){
            const isCouple = card.getId() === findOpenCard.getId();
            if(isCouple){
                findOpenCard.success();
                card.success(true);
            } else {
                findOpenCard.wrong();
                card.wrong(true);
            }
        } else {
            card.open();
        }
        if (this.cardsList.every((x) => x.getStatus() === enumStatus.SUCCESS)){
            this.endGame(true);
        }
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
        //создаем карточки на основе узлов .card, которые мы нашли
        this.cardsList = this.cardElems.map(
            (card, index) => new Card(card, this.emojiList[index])
        );
    }
    shuffleEmoji(){
        this.emojiList = this.emojiList.sort(() => Math.random() - 0.5)
    }
}

class Card{
    constructor(node, {id, emoji}){
        this.node = node;
        this.id = id;
        this.status = enumStatus.CLOSE;
        this.node.textContent = emoji;
    }
    getStatus(){
        return this.status;
    }
    getId(){
        return this.id;
    }
    addClass(name){
        this.node.classList.add(name);
    }
    removeClass(name){
        this.node.classList.remove(name)
    }
    clearContext(){
        ['open', 'wrong', 'success', 'open-success', 'open-wrong'].forEach((n) => this.removeClass(n));
    }
    open(){
        this.removeClass('close');
        this.addClass('open');
        this.status = enumStatus.OPEN;
    }
    close(){
        this.clearContext();
        this.addClass('close');
        this.status = enumStatus.CLOSE;
    }
    success(flip){
        this.removeClass('close');
        this.addClass(flip ? 'open-success' : 'success');
        this.status = enumStatus.SUCCESS;
    }
    wrong(flip){
        this.removeClass('close');
        this.addClass(flip ? 'open-wrong' : 'wrong');
        this.status = enumStatus.WRONG;
    }
}
  
(function init() {
    const emojiList = '💀 ☠️ 👽 👾 🤖 🎃'.split(' ')
    const cards = document.querySelector('.card');
    const shuffleEmoji = shuffleArr(coupleArr(emojiList));
    const timerNode = document.querySelector('.timer');
    const alertNode = document.querySelector('.alert');
    new GameProcess({
        emojiList,
        cards,
        shuffleEmoji,
        timerNode,
        alertNode
    })
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