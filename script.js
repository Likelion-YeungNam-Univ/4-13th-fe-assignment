// 요소 선택
const historyWrap = document.querySelector(".history-wrap");
const result = document.querySelector(".result");
const numBtns = document.querySelectorAll(".num-btn"); //0 ~ 9, C, <- 버튼
const calcBts = document.querySelectorAll(".calc-btn"); // +, -, *, /, = 버튼

// 변수 선언
let formula = ""; // 수식
let resultNum = 0; // 계산 결과
let historyList = []; // 계산 기록

// 기록 업데이트
const updateHistory = () => {
  // 1. historyWrap 내 HTML 초기화 ✅
  historyWrap.innerHTML = "";

  // 2. historyWrap 내 계산 기록(historyList) 요소들 추가 ✅
  historyList.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `${item.formula} = ${item.result} <button style="padding:0" onclick="deleteHistory(${index})">❌</button>`;
    historyWrap.appendChild(li);
  });
};

const deleteHistory = (index) => {
  // historyList에서 해당 인덱스 요소 제거 ✅
  historyList.splice(index, 1);
  updateHistory();
};

// 계산 함수
const calculate = (e) => {
  // 1. 클릭된 값 받아오기 ✅
  // console.log(e);
  const input = e.target.innerText;

  // 2. 클릭된 값에 따라 동작 구현(=, C, ←, 나머지) ✅
  if (input === "=") {
    if (formula === "") return;

    resultNum = eval(formula);
    resultNum = Math.round(resultNum * 100) / 100; //소수점 아래 두 번째 까지로 맞춰주는 코드
    result.innerText = resultNum;
    historyList.unshift({ formula, result: resultNum });

    updateHistory();

    formula = resultNum.toString();
    // result.innerText = "";
  } else if (input === "C") {
    formula = "";
    result.innerText = "";
  } else if (input === "←") {
    formula = formula.slice(0, -1);
    // console.log(formula);
    result.innerText = formula;
  } else {
    formula += input;
    result.innerText = formula;
  }

  // 추가 정보
  // HTML 내의 &#8592; 는 화살표이며, JavaScript에선 ← 를 사용
  // formula 내의 수식을 계산할 때는 resultNum = eval(formula) 를 사용
  // 계산 결과가 소수일 경우 소수점 두 번째 자리까지만 계산
};

// .num-bt 이벤트 리스너 등록 ✅
numBtns.forEach((btn) => {
  btn.addEventListener("click", calculate);
});

// .calc-btn 이벤트 리스너 등록 ✅
calcBts.forEach((btn) => {
  btn.addEventListener("click", calculate);
});
