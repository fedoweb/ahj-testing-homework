export default class Payment {

  check(cardNumber) {
    if(!cardNumber) return;

    const num = this.parseCardNumber(cardNumber);
    
    const firstOne = num[0];
    const firstTwo = num.slice(0, 2);
    const firstThree = num.slice(0, 3);
    const firstFour = num.slice(0, 4);
    const firstSix = num.slice(0, 6);

    if (firstOne === '4') return 'Visa';
    
    if ((firstTwo >= 51 && firstTwo <= 55) || 
        (firstFour >= 2221 && firstFour <= 2720)) return 'Mastercard';
    
    if (firstTwo === '34' || firstTwo === '37') return 'American Express';
    
    if (firstFour >= 2200 && firstFour <= 2204) return 'МИР';
    
    if (firstTwo === '35') return 'JCB';

    if (firstFour === '6011' || 
        (firstSix >= 622126 && firstSix <= 622925) || 
        (firstThree >= 644 && firstThree <= 649) || 
        firstTwo === '65') return 'Discover';
    
    if (firstTwo === '62' || firstTwo === '81') return 'UnionPay';
    
    if (firstTwo === '36' || firstTwo === '38' || 
        (firstThree >= 300 && firstThree <= 305) || 
        firstFour === '3095') return 'Diners Club';

    return 'Unknown';
  }

  parseCardNumber(cardNumber) {
    return cardNumber.replace(/\D/g, '');
  }
}