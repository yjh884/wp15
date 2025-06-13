// 요소 생성
const h1 = document.createElement("h1");
h1.textContent = "자연연역 연습장";

const p = document.createElement("p");
p.textContent = "자연연역을 연습할 수 있는 공간입니다. 아래에 문제를 입력하고 복합명제를 추가하세요.";

const textarea = document.createElement("textarea");
textarea.id = "problem-statements";
textarea.cols = 80;
textarea.rows = 5;
textarea.value = `아담이 백만장자라면, 가난은 이브가 그의 청혼을 거절한 이유가 아니다.
그런데 이브가 그의 청혼을 거절한 이유는 아담이 가난하다는 것 또는 그가 매력이 없다는 것 둘 중의 하나이다.
아담은 백만장자이다. 그러므로 매력이 없다는 것이 아담이 청혼을 거절당한 이유임에 틀림없다.`;

// body에 추가
document.body.appendChild(h1);
document.body.appendChild(p);
document.body.appendChild(textarea);

