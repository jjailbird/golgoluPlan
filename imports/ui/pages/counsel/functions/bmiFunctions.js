export const getBmiPoint = (weight, height) => weight / (height / 100 * height / 100);
export const getBmiDescription = (bmiPoint) => {
  let bmiDesc = '';
  if (bmiPoint < 18.5) {
    bmiDesc = '저체중';
  } else if (bmiPoint >= 18.5 && bmiPoint <= 22.9) {
    bmiDesc = '건강체중';
  } else if (bmiPoint > 22.9 && bmiPoint <= 24.9) {
    bmiDesc = '경도비만';
  } else if (bmiPoint > 24.9 && bmiPoint <= 35) {
    bmiDesc = '중등비만';
  } else if (bmiPoint > 35) {
    bmiDesc = '고도비만';
  }
  return bmiDesc;
};

