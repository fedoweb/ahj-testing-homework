export default class Validator {

  check(cardNumber) {
 
    if (!cardNumber) return false;

    const cleaned = cardNumber.replace(/\D/g, '');
    if (cleaned.length < 13 || cleaned.length > 19) return false;

    return this.checkLuhn(cleaned);
  }

  checkLuhn(cleaned) {
    let sum = 0;
    let shouldDouble = false; 

    for (let i = cleaned.length - 1; i >= 0; i--) {
      let digit = parseInt(cleaned[i], 10);
      
      if (shouldDouble) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }

      sum += digit;
      shouldDouble = !shouldDouble;
    }

    return sum % 10 === 0;
  }
}