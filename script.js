// 요소 선택
const historyWrap = document.querySelector(".history-wrap");
const result = document.querySelector(".result");

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
    historyWrap.innerHTML += `
    <li>${historyList[i]}<button onClick="deleteHistory(${i})">X</button></li>
    `
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
  const input = e.target.innerText;

  // 2. 클릭된 값에 따라 동작 구현(=, C, ←, 나머지) ✅
  // "C" 버튼 클릭 시 초기화
  if (input === "C") {
    formula = "";
    result.innerText = "";

    historyList = [];
    updateHistory();
    return;
  }

  // "←" 버튼 클릭 시 뒤에서 한 글자 제거
  if (input === "←") {
    formula = formula.slice(0, -1);
    result.innerText = formula;
    return;
  }

  // "=" 버튼 클릭 시 계산 및 소수점 2자리까지 반올림
  if (input === "=") {
    resultNum = eval(formula).toFixed(2) - 0;
    historyList.unshift(formula + " = " + resultNum);

    result.innerText = resultNum;
    formula = resultNum.toString();

    updateHistory();
    return;
  }

  // 그 외 숫자나 연산자 버튼은 그대로 추가
  /**
   * UX 개선
   * 표시된 입력이 "0"일 때 숫자 입력 시 자동으로 치환
   * ex) "0" -> [9입력] -> "9"
   * 입력 흐름을 부드럽게 하기 위함
   */
  if (formula === "0" && input >= "0" && input <= "9") {
    formula = input;
  } else {
    formula += input;
  }

  result.innerText = formula;
};

// .num-bt 이벤트 리스너 등록 ✅
// .calc-btn 이벤트 리스너 등록 ✅
const btns = document.querySelectorAll(".num-btn, .calc-btn");
btns.forEach((btn) => {
  btn.addEventListener("click", calculate);
});