const calculateFee = (ethAmount) => {
    let feePercentage;
  
    if (ethAmount <= 1) {
      feePercentage = 5;
    } else if (ethAmount > 1 && ethAmount <= 5) {
      feePercentage = 3;
    } else if (ethAmount > 5 && ethAmount <= 10) {
      feePercentage = 2.5;
    } else if (ethAmount > 10 && ethAmount <= 50) {
      feePercentage = 2;
    } else {
      feePercentage = 1.5;
    }
  
    return ethAmount * (feePercentage / 100);
  };
  
  export default calculateFee;
  