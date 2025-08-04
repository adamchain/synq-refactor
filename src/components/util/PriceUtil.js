export default class PriceUtil {
  static allowfloat = (input = "") => {
    return input.replace(/[^0-9\.]/g, "");
  };

  static convertFloat = (input) => {
    return input ? (isNaN(input) ? 0.0 : Number.parseFloat(input)) : 0.0;
  };
  static dollarValue(value, fixedDecimal = 2, useHyphenForzero) {
    return useHyphenForzero && this.convertFloat(value).toFixed(2) == 0
      ? "-"
      : "$" + this.convertFloat(value).toFixed(2);
  }
  static dollarOrPercentValue(incomingvalue, type, fixedDecimal = 2) {
    let value = this.convertFloat(incomingvalue).toFixed(2);
    value = type === "$" ? "$" + value : value + "%";
    return value;
  }

  static discountCalculate = (value, discount) => {
    return (
      (PriceUtil.convertFloat(value) * PriceUtil.convertFloat(discount)) / 100
    );
  };
  static decimalFix(value, fixedDecimal = 2) {
    return this.convertFloat(value).toFixed(2);
  }
}
