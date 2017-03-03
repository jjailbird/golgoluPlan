export const getBmiPoint = (weight, height) => weight / (height / 100 * height / 100);
export const getBmiDescription = (bmiPoint) => {
  let bmiDesc = '';
  if (bmiPoint < 18.5) {
    bmiDesc = '심한 저체중';
  } else if (bmiPoint > 18.5 && bmiPoint < 25) {
    bmiDesc = '정상';
  } else if (bmiPoint > 25) {
    bmiDesc = '과체중';
  }
  return bmiDesc;
};

