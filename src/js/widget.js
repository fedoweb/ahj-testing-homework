import CardList from "./cardList";
import Form from "./form";
import Validator from "./validator";
import Payment from "./payment";

export default class Widget {
  constructor(container) {
    this.container = container;
    this.cardList = new CardList();
    this.form = new Form();
    this.validator = new Validator();
    this.payment = new Payment();

    this.formButton = null;
    this.formInput = null;
    this.cardNumber = '';
  }

  init() {
    this.createWidget(this.container);

    this.formInput = this.container.querySelector('.form_control');
    this.formButton = this.container.querySelector('.form_button');

    this.formInput.addEventListener('input', this.handleInput);
    this.formButton.addEventListener('click', this.handleSubmit);
  }

  handleInput = (e) => {
    this.form.removeMessage(this.container);

    this.cardNumber = e.target.value;
    this.identPayment(this.cardNumber);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.form.removeMessage(this.container);

    const valid = this.validator.check(this.cardNumber);

    if(valid) {
      this.form.createMessage(this.container, valid);
      this.formInput.value = '';
      this.cardNumber = '';
      this.cardList.resetCardStyle();

    } else {
      this.form.createMessage(this.container, valid);
    }
  }

  createWidget(container) {
    container.append(this.cardList.createCardList(this.cardList.cardTypes()));
    container.append(this.form.createForm());
  }

  identPayment(cardNumber) {
    const payment = this.payment.check(cardNumber);
    this.updateCardStyle(payment);
  }

  updateCardStyle(payment) {
    const cardList = document.querySelectorAll('.widget_card_item');

    cardList.forEach(card => {
      const cardTitle = card.querySelector('.cards').title;

      if(cardTitle === payment) {
        card.style.filter = 'none';
      } else {
        card.style.filter = 'grayscale(100%)';
      }
    });

    if (!this.cardNumber) {
      this.cardList.resetCardStyle();
    }
  }
}