export default class CardList{
  constructor() {

  }

  createCardList(cardTypes) {
    const ulElement = document.createElement('ul');
    ulElement.classList.add('widget_card');
     cardTypes.forEach(element => {
      const liElement = this.cardElement(element);
      liElement.style.backgroundImage = `url('pic/${element.type}.png')`;
      ulElement.append(liElement);
     });
     return ulElement;
  }

  cardTypes() {
    return [
      {type: "mir", title: 'МИР'},
      {type: "visa", title: 'Visa'},
      {type: "mastercard", title: 'Mastercard'},
      {type: "americanExpress", title: 'American Express'},
      {type: "discover", title: 'Discover'},
      {type: "jcb", title: 'JCB'},
      {type: "diners", title: 'Diners Club'},
    ]
  }

  cardElement(cardType) {
    const liElement = document.createElement('li');
    liElement.classList.add('widget_card_item');
    liElement.innerHTML = `<span class="cards ${cardType.type}" title="${cardType.title}">${cardType.title}</span>`;
    return liElement;
  }

  resetCardStyle() {
    const cards = document.querySelectorAll('.widget_card_item');
    cards.forEach(card => {
      card.style.filter = 'none';
    });
  }
}