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
  //
  // 이게 위에 출력하는 거임. historyWrap에다가.
  // = 눌렀을 때 계산하고 바로 List로 넣고 이 함수에서는 List 값을 Wrap으로 옮기는 건가 ?
  const addHistory = document.createElement("li");
  addHistory.innerText = historyList[historyList.length - 1];

  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "X";

  deleteBtn.addEventListener("click", () => {
    historyWrap.removeChild(addHistory);
  });

  addHistory.appendChild(deleteBtn);
  historyWrap.appendChild(addHistory);
};

const deleteHistory = () => {
  // historyList에서 해당 인덱스 요소 제거 ✅
  // 이거 5개까지만 보이고 초과될 때마다 지우는 건가 ?
  historyList.splice(0, 1); // historyList 배열에서 0번 인덱스 제거

  const temp = document.querySelector("li"); // 가장 먼저 선택되는 <li>태그(= 가장 먼저 추가됐던 <li>태그)를 temp에 지정

  historyWrap.removeChild(temp); // temp에 지정된 <li>태그 제거
  // updateHistory();
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
  //
  // 이거 혹시 밑에 이벤트 리스너 안에 함수를 여기다 다 옮기고 .addEventListener("click", calculate()); 하면 됨 ?
  // nBtn이랑 cBtn이랑 무관하게 btn으로 써도 되나 ?
  // 된다면 -> else 내용이 중복이라 축약된다는 이점 있음
};

// .num-btn 이벤트 리스너 등록 ✅
const numBtn = document.querySelectorAll(".num-btn");

// forEach()를 사용해서 NodeList 각 버튼마다 처리하도록, nBtn은 현재 클릭된 버튼
numBtn.forEach((nBtn) => {
  nBtn.addEventListener("click", () => {
    // 만약 누른 버튼이 C 라면
    // 누르면 기록까지 전부 다 없어져야 함
    if (nBtn.innerText == "C") {
      formula = "";
      resultNum = 0;
      historyList = [];
      result.innerText = formula;
      // updateHistory();
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

// forEach()를 사용해서 NodeList 각 버튼마다 처리하도록, cBtn은 현재 클릭된 버튼
calcBtn.forEach((cBtn) => {
  cBtn.addEventListener("click", () => {
    // 만약 누른 버튼이 = 이라면
    if (cBtn.innerText == "=") {
      resultNum = eval(formula); // 수식(formula)을 계산한 값을 계산 결과(resultNum)에 넣고
      result.innerText = resultNum; // <div>태그에 넣어서 출력
      historyList.push(`${formula} = ${resultNum}`); // 수식과 결과를 historyList 배열 끝에 문자열로 추가
      if (historyList.length == 6) {
        deleteHistory();
      }
      updateHistory();
      formula = resultNum; // 수식(formula)의 값을 계산 결과로 초기화
    }
    // 아니라면
    else {
      formula += cBtn.innerText; // 누른 버튼의 값을 수식(formula)에 넣고
      result.innerText = formula; // 수식(formula)을 <div>태그에 넣어서 출력
    }
  });
});

// 다음에 켰을 때
// C 버튼 기능 다시
// 이벤트 리스너에서 실행되는 함수 합치기(?)
// 소수점 2자리까지만 출력
// historyWrap 출력에서 X버튼으로 지워도 historyList에는 남아서 출력이 5개가 아닌데 계속 최신화되는 문제
