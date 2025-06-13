document.body.style.cssText = "font-family: 'Malgun Gothic', Verdana, Geneva, Arial, Helvetica, sans-serif; font-size: 11pt;";

const generateInput = (hint, classLabel, inputWidth = '800px') => {
    const inputElem = document.createElement('input');
    inputElem.placeholder = hint;
    inputElem.className = classLabel;
    Object.assign(inputElem.style, {
        width: inputWidth,
        margin: '10px',
        padding: '5px'
    });
    return inputElem;
};

const generateButton = (label, onClick, btnWidth = '', fontColor = '') => {
    const button = document.createElement('button');
    button.textContent = label;
    button.style.cursor = 'pointer';
    if (btnWidth) button.style.width = btnWidth;
    if (fontColor) {
        Object.assign(button.style, {
            backgroundColor: 'white',
            color: fontColor,
            border: 'none'
        });
    }
    button.addEventListener('click', onClick);
    return button;
};

const makeBox = () => {
    const box = document.createElement('div');
    Object.assign(box.style, {
        width: '810px',
        margin: '10px',
        border: '1px solid #ccc'
    });
    return box;
};

document.body.innerHTML = `
    <h1>자연연역 연습장</h1>
    <p>자연연역을 연습할 수 있는 공간입니다. 아래에 문제를 입력하고 복합명제를 추가하세요.</p>
`;

const exampleText = document.createElement('textarea');
exampleText.value = `아담이 백만장자라면, 가난은 이브가 그의 청혼을 거절한 이유가 아니다.
그런데 이브가 그의 청혼을 거절한 이유는 아담이 가난하다는 것 또는 그가 매력이 없다는 것 둘 중의 하나이다.
아담은 백만장자이다. 그러므로 매력이 없다는 것이 아담이 청혼을 거절당한 이유임에 틀림없다.`;
Object.assign(exampleText.style, {
    width: '800px',
    height: '100px',
    margin: '10px',
    padding: '5px'
});
document.body.appendChild(exampleText);

const compoundEntry = generateInput('복합명제를 입력하세요.', '');
const compoundBtn = generateButton('추가', () => {
    if (!compoundEntry.value.trim()) return;
    const item = document.createElement('li');
    item.textContent = compoundEntry.value;

    const removeBtn = generateButton('[X]', () => compoundList.removeChild(item), '', 'red');
    removeBtn.className = 'remove-btn';
    item.appendChild(removeBtn);
    compoundList.appendChild(item);

    compoundEntry.value = '';
    compoundEntry.focus();
});
document.body.append(compoundEntry, compoundBtn);

const compoundList = document.createElement('ol');
compoundList.type = '1';
const compoundContainer = makeBox();
compoundContainer.appendChild(compoundList);
document.body.appendChild(compoundContainer);

const simpleEntry = generateInput('단순명제를 입력하세요.', '');
const simpleBtn = generateButton('추가', () => {
    if (!simpleEntry.value.trim()) return;
    const item = document.createElement('li');
    item.textContent = simpleEntry.value;

    const removeBtn = generateButton('[X]', () => simpleList.removeChild(item), '', 'red');
    removeBtn.className = 'remove-btn';
    item.appendChild(removeBtn);
    simpleList.appendChild(item);

    simpleEntry.value = '';
    simpleEntry.focus();
});
document.body.append(simpleEntry, simpleBtn);

const simpleList = document.createElement('ol');
simpleList.type = 'A';
const simpleContainer = makeBox();
simpleContainer.appendChild(simpleList);
document.body.appendChild(simpleContainer);

const symbolInput = generateInput('기호명제를 입력하세요.', 'input1', '420px');
symbolInput.style.margin = '10px 0 10px 10px';

const ref1 = generateInput('', 'input2', '40px');
const ref2 = generateInput('', 'input2', '40px');
const ruleLabel = generateInput('', 'input2', '40px');

const ruleDropdown = document.createElement('select');
[
    "전제", "결론", " → 제거", "∨ 제거", "∨ 도입", "→ 도입",
    "∧ 제거", "∧ 도입", "↔ 도입", "↔ 제거", "∼ 제거", "∼ 도입"
].forEach(rule => {
    const option = new Option(rule, rule);
    ruleDropdown.appendChild(option);
});
Object.assign(ruleDropdown.style, {
    width: '195px',
    margin: '10px 0',
    padding: '5px'
});
ruleDropdown.addEventListener('change', () => ruleLabel.value = ruleDropdown.value);
ruleLabel.value = ruleDropdown.value;

document.body.append(symbolInput, ref1, ref2, ruleLabel, ruleDropdown, document.createElement('br'));

const logicList = document.createElement('ol');
logicList.type = '1';

const insertLogicSymbol = (symbol) => {
    const start = symbolInput.selectionStart;
    const end = symbolInput.selectionEnd;
    const text = symbolInput.value;
    symbolInput.value = text.slice(0, start) + symbol + text.slice(end);
    symbolInput.setSelectionRange(start + symbol.length, start + symbol.length);
    symbolInput.focus();
};

const logicActions = [
    ['추가', () => {
        if (!symbolInput.value.trim()) return;
        const item = document.createElement('li');

        const logicExpr = document.createElement('span');
        logicExpr.textContent = symbolInput.value;
        Object.assign(logicExpr.style, {
            marginRight: '20px',
            flexGrow: '1',
            borderBottom: '1px solid #aaa'
        });
        item.appendChild(logicExpr);

        const refs = [ref1.value, ref2.value].filter(Boolean).join(',');
        const reason = document.createElement('span');
        reason.textContent = refs ? `${refs}, ${ruleLabel.value}` : `${ruleLabel.value}`;
        item.appendChild(reason);

        const removeBtn = generateButton('[X]', () => logicList.removeChild(item), '', 'red');
        removeBtn.className = 'remove-btn';
        item.appendChild(removeBtn);

        logicList.appendChild(item);

        symbolInput.value = '';
        ref1.value = '';
        ref2.value = '';
        ruleLabel.value = '전제';
        ruleDropdown.value = '전제';
        symbolInput.focus();
    }],
    ['∼', () => insertLogicSymbol('∼')],
    ['∧', () => insertLogicSymbol('∧')],
    ['∨', () => insertLogicSymbol('∨')],
    ['→', () => insertLogicSymbol('→')],
    ['↔', () => insertLogicSymbol('↔')]
];

logicActions.forEach(([label, action]) => {
    document.body.appendChild(generateButton(label, action));
});

const logicContainer = makeBox();
logicContainer.appendChild(logicList);
document.body.appendChild(logicContainer);

const footer = document.createElement('footer');
footer.innerHTML = `<span>20243082 윤재환</span>&nbsp<a href="https://github.com/yjh884/wp15.git">git</a>`;
Object.assign(footer.style, {
    fontSize: '15px'
});
document.body.appendChild(footer);
