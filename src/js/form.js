export default class Form {
  constructor() {

  }

  createForm() {
    const form = document.createElement('form');
    form.id = 'form';
    form.classList.add('widget_form');

    const formGroup = document.createElement('div');
    formGroup.classList.add('form_group');

    formGroup.append(this.createInputForm());
    formGroup.append(this.createButtonForm());

    form.append(formGroup);
    return form;
  }

  createInputForm() {
    const input = document.createElement('input');
    input.type ='text';
    input.placeholder = 'Credit card number';
    input.classList.add('form_control');

    return input;
  }

  createButtonForm() {
    const button = document.createElement('button');
    button.textContent = 'Click to Validate';
    button.classList.add('form_button');

    return button;
  }

  createMessage(container, valid) {
    const message = document.createElement('div');
    if(valid) {
      message.textContent = 'Card number is valid';
      message.style.color = 'rgb(96, 188, 96)';
    } else {
      message.textContent = 'Invalid card number';
      message.style.color = 'red';
    }
    
    message.classList.add('form_message');
    container.append(message);

    return message;
  }

  removeMessage(container) {
    const message = container.querySelector('.form_message');
    if(message) message.remove();
  }
}