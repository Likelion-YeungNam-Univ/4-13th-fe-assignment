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
  historyList.forEach((item, index) => {
    const li = document.createElement("li");
    const span = document.createElement("span");
    span.innerText = item;

    const deleteButton = document.createElement("button");
    deleteButton.innerText = "삭제";

    // 삭제 버튼에 직접 이벤트 리스너 등록
    deleteButton.addEventListener("click", () => {
      deleteHistory(index);
    });

    li.appendChild(span);
    li.appendChild(deleteButton);
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
  const value = e.target.innerText;

  // 2. 클릭된 값에 따라 동작 구현(=, C, ←, 나머지) ✅
  // 추가 정보
  // formula 내의 수식을 계산할 때는 resultNum = eval(formula) 를 사용
  // 계산 결과가 소수일 경우 소수점 두 번째 자리까지만 계산
  if (value === "=") {
    resultNum = eval(formula).toFixed(2) - 0;
    historyList.unshift(formula + " = " + resultNum);

    result.innerText = resultNum;
    formula = resultNum.toString();

    updateHistory();
  } else if (value === "C") {
    formula = "";
    result.innerText = "";
    historyList = [];
    updateHistory();
  } else if (value === "←") {
    formula = formula.slice(0, -1);
    result.innerText = formula;
  } else {
    formula += value;
    result.innerText = formula;
  }
};

// .num-bt 이벤트 리스너 등록 ✅
document.querySelectorAll(".num-btn").forEach((btn) => {
  btn.addEventListener("click", calculate);
});

// .calc-btn 이벤트 리스너 등록 ✅
document.querySelectorAll(".calc-btn").forEach((btn) => {
  btn.addEventListener("click", calculate);
});
