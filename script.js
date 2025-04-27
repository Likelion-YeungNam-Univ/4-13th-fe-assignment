// 요소 선택
const historyWrap = document.querySelector(".history-wrap");
const result = document.querySelector(".result");
const num_btns = document.querySelectorAll(".num-btn");
const calc_btns = document.querySelectorAll(".calc-btn");

// 변수 선언
let formula = ""; // 수식
let resultNum = 0; // 계산 결과
let historyList = []; // 계산 기록

// 기록 업데이트
const updateHistory = () => {
  // 1. historyWrap 내 HTML 초기화 ✅
  historyWrap.innerHTML = "";
  // 2. historyWrap 내 계산 기록(historyList) 요소들 추가 ✅
  for (let i = 0; i < historyList.length; i++) {
    const li = document.createElement("li");
    li.innerText = historyList[i];
    historyWrap.appendChild(li);
  }
};

const deleteHistory = (index) => {
  // historyList에서 해당 인덱스 요소 제거 ✅
  historyList.splice(index, 1);
  updateHistory();
};

// 계산 함수
const calculate = (e) => {
  // 1. 클릭된 값 받아오기 ✅
  const clickedValue = e.target.innerText;

  // 2. 클릭된 값에 따라 동작 구현(=, C, ←, 나머지) ✅
  if (clickedValue == "=") {
    resultNum = eval(formula);
    if (Number.isInteger(resultNum)) {
      // 정수면 그냥 사용
      resultNum = resultNum;
    } else {
      resultNum = parseFloat(resultNum.toFixed(2)); // 정수가 아니면 소수점 둘째 자리까지 표시
    }
    result.innerText = resultNum;
    formula += " = " + resultNum;
    historyList.push(formula);
    updateHistory();
    formula = resultNum.toString(); // "=" 연산 후에 남아있는 result 값에도 "<-" 연산을 할 수 있게끔
  } else if (clickedValue == "C") {
    result.innerText = "";
    formula = "";
    historyList = [];
    updateHistory();
  } else if (clickedValue == "←") {
    formula = formula.slice(0, -1);
    result.innerText = formula;
  } else {
    formula += clickedValue;
    result.innerText = formula;
  }
  // 추가 정보
  // HTML 내의 &#8592; 는 화살표이며, JavaScript에선 ← 를 사용
  // formula 내의 수식을 계산할 때는 resultNum = eval(formula) 를 사용
  // 계산 결과가 소수일 경우 소수점 두 번째 자리까지만 계산
};

// .num-bt 이벤트 리스너 등록 ✅;
num_btns.forEach((numBtn) => {
  numBtn.addEventListener("click", (e) => {
    calculate(e);
  });
});

// .calc-btn 이벤트 리스너 등록 ✅
calc_btns.forEach((calcBtn) => {
  calcBtn.addEventListener("click", (e) => {
    calculate(e);
  });
});
