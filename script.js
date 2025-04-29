// 요소 선택
const historyWrap = document.querySelector(".history-wrap");
const result = document.querySelector(".result");
const num_btn = document.querySelectorAll(".num-btn");
const calc_btn = document.querySelectorAll(".calc-btn");

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

    const span = document.createElement("span");
    span.innerText = item;

    const del_btn = document.createElement("button");
    del_btn.innerText = "X";
    del_btn.addEventListener("click", () => deleteHistory(index));

    li.appendChild(span);
    li.appendChild(del_btn);
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
  const inputValue = e.target.innerText;

  // 2. 클릭된 값에 따라 동작 구현(=, C, ←, 나머지) ✅
  if (inputValue == "=") {
    resultNum = eval(formula);
    resultNum = resultNum.toFixed(2);
    historyList.push(formula + " = " + resultNum);
    result.innerText = resultNum;
    formula = "";
    updateHistory();
  } else if (inputValue == "C") {
    formula = "";
    result.innerText = resultNum;
  } else if (inputValue == "←") {
    formula = formula.slice(0, -1);
    result.innerText = resultNum;
  } else {
    formula += inputValue;
    result.innerText = resultNum;
  }
};

// .num-btn 이벤트 리스너 등록 ✅
num_btn.forEach(function (btn) {
  btn.addEventListener("click", calculate);
});

// .calc-btn 이벤트 리스너 등록 ✅
calc_btn.forEach(function (btn) {
  btn.addEventListener("click", calculate);
});
