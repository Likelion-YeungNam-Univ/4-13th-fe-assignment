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
  // 2. historyWrap 내 계산 기록(historyList) 요소들 추가 ✅
  const addHistory = document.createElement("ul");
  addHistory.innerText = `${formula} = ${resultNum}`;
  addHistory.className = "addHistory";

  // addHistory.appendChild(deleteBtn);
  historyList.appendChild(addHistory);
};

const deleteHistory = (index) => {
  // historyList에서 해당 인덱스 요소 제거 ✅
  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "X";
  deleteBtn.className = "deleteBtn";

  deleteBtn.addEventListener("click", () => {
    historyList.removeChild(addHistory);
  });

  updateHistory();
};

// 계산 함수
const calculate = (e) => {
  // 1. 클릭된 값 받아오기 ✅
  // 2. 클릭된 값에 따라 동작 구현(=, C, ←, 나머지) ✅
  //
  // 추가 정보
  // HTML 내의 &#8592; 는 화살표이며, JavaScript에선 ← 를 사용
  // formula 내의 수식을 계산할 때는 resultNum = eval(formula) 를 사용
  // 계산 결과가 소수일 경우 소수점 두 번째 자리까지만 계산
};

// .num-btn 이벤트 리스너 등록 ✅
const numBtn = document.querySelectorAll(".num-btn");

// forEach()를 사용해서 NodeList 각 버튼마다 처리하도록, nBtn은 현재 클릭된 num-btn
numBtn.forEach((nBtn) => {
  nBtn.addEventListener("click", () => {
    // 만약 누른 버튼이 C 라면
    if (nBtn.innerText == "C") {
      formula = "";
      result.innerText = formula;
    }
    // 또는 누른 버튼이 ← 라면
    else if (nBtn.innerText == "←") {
      formula = formula.slice(0, -1); // 문자열에서 마지막 문자 제거
      result.innerText = formula; // 마지막 문자가 제거된 수식(formula)을 <div>태그에 넣어서 출력
    }
    // 아니라면
    else {
      formula += nBtn.innerText; // 누른 버튼의 값을 수식(formula)에 넣고
      result.innerText = formula; // 수식(formula)을 <div>태그에 넣어서 출력
    }
  });
});

// .calc-btn 이벤트 리스너 등록 ✅
const calcBtn = document.querySelectorAll(".calc-btn"); // calc-btn 클래스 NodeList로

// forEach()를 사용해서 NodeList 각 버튼마다 처리하도록, cBtn은 현재 클릭된 calc-btn
calcBtn.forEach((cBtn) => {
  cBtn.addEventListener("click", () => {
    // 만약 누른 버튼이 = 이라면
    if (cBtn.innerText == "=") {
      resultNum = eval(formula); // 수식(formula)을 계산한 값을 계산 결과(resultNum)에 넣고
      result.innerText = resultNum; // <div>태그에 넣어서 출력
      formula = resultNum; // 수식(formula)의 값을 계산 결과로 초기화
      updateHistory();
    }
    // 아니라면
    else {
      formula += cBtn.innerText; // 누른 버튼의 값을 수식(formula)에 넣고
      result.innerText = formula; // 수식(formula)을 <div>태그에 넣어서 출력
    }
  });
});
