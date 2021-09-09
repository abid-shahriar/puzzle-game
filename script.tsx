const minionData = [
  {
    id: 1,
    img: '/images/minion/minion-01.jpg'
  },
  {
    id: 2,
    img: '/images/minion/minion-02.jpg'
  },
  {
    id: 3,
    img: '/images/minion/minion-03.jpg'
  },
  {
    id: 4,
    img: '/images/minion/minion-04.jpg'
  },
  {
    id: 5,
    img: '/images/minion/minion-05.jpg'
  },
  {
    id: 6,
    img: '/images/minion/minion-06.jpg'
  },
  {
    id: 7,
    img: '/images/minion/minion-07.jpg'
  },
  {
    id: 8,
    img: '/images/minion/minion-08.jpg'
  },
  {
    id: 9,
    img: '/images/minion/minion-09.jpg'
  },
  {
    id: 10,
    img: '/images/minion/minion-10.jpg'
  },
  {
    id: 11,
    img: '/images/minion/minion-11.jpg'
  },
  {
    id: 12,
    img: '/images/minion/minion-12.jpg'
  },
  {
    id: 13,
    img: '/images/minion/minion-13.jpg'
  },
  {
    id: 14,
    img: '/images/minion/minion-14.jpg'
  },
  {
    id: 15,
    img: '/images/minion/minion-15.jpg'
  },
  {
    id: 16,
    img: '/images/minion/minion-16.jpg'
  }
];

const imagesContainer = document.getElementById('images-container')!;
const puzzleBox = document.querySelector('.puzzle-box')!;
const shuffleBtn = document.getElementById('shuffle-btn')!;
const message = document.querySelector('.message')!;
const doneMessage = document.querySelector('.done-message')!;
const playAgainBtn = document.getElementById('play-again-btn')!;

let startElement = undefined;
let startElementSerial = undefined;

let allImageElements = [];

generateLists(minionData);

paintToDom(imagesContainer, allImageElements);

addDragEvents(imagesContainer);

// create image elements from the data
function generateLists(arr: { id: number; img: string }[]) {
  arr
    .map((item) => ({ value: item, num: Math.random() }))
    .sort((a: any, b: any) => a.num - b.num)
    .map(({ value }) => value)
    .forEach((item, index) => {
      const imgContainer = document.createElement('div');

      imgContainer.setAttribute('data-index', `${index}`);

      imgContainer.innerHTML = `<img class='img' serial-index="${item.id}" draggable="true" src="${item.img}" />`;

      allImageElements.push(imgContainer);
    });
}

// paint all the image tags on DOM
function paintToDom(parentElement: HTMLElement, arr: string[]) {
  arr.forEach((element: any) => {
    parentElement.appendChild(element);
  });
}

// add all drag events to all the images
function addDragEvents(parentElement: any) {
  const allChildren = [...parentElement.children];
  allChildren.forEach((item: any) => {
    item.children[0].addEventListener('dragstart', dragStart);
    item.children[0].addEventListener('dragenter', dragEnter);
    item.children[0].addEventListener('dragover', dragOver);
    item.children[0].addEventListener('dragleave', dragLeave);
    item.children[0].addEventListener('drop', dragDrop);
  });
}

function dragStart() {
  startElementSerial = +this.closest('div').getAttribute('data-index');

  startElement = allImageElements[startElementSerial].querySelector('.img');
}

function dragEnter() {
  this.classList.add('over');
}
function dragOver(e) {
  e.preventDefault();
}
function dragLeave() {
  this.classList.remove('over');
}
function dragDrop() {
  const allContainers = document.querySelectorAll('#images-container > div')!;
  const serialIndex = +this.closest('div').getAttribute('data-index');
  const dropElement = allImageElements[serialIndex].querySelector('.img');
  this.classList.remove('over');
  allContainers[serialIndex].innerHTML = '';
  allContainers[startElementSerial].innerHTML = '';

  allContainers[serialIndex].appendChild(startElement);
  allContainers[startElementSerial].appendChild(dropElement);

  puzzleDone();
}

function puzzleDone() {
  const allContainers = document.querySelectorAll('#images-container > div > img')!;

  const matchedElements = minionData.filter((item, idx) => +allContainers[idx].getAttribute('serial-index') === item.id);

  if (matchedElements.length === minionData.length) {
    shuffleBtn.classList.add('hidden');
    message.classList.add('hidden');
    doneMessage.classList.remove('hidden');
    puzzleBox.classList.add('done');
  }
}

function playAgain() {
  shuffleBtn.classList.remove('hidden');
  doneMessage.classList.add('hidden');
  message.classList.remove('hidden');
  puzzleBox.classList.remove('done');

  startElement = undefined;
  startElementSerial = undefined;
  imagesContainer.innerHTML = '';
  allImageElements = [];

  generateLists(minionData);

  paintToDom(imagesContainer, allImageElements);

  addDragEvents(imagesContainer);
}

shuffleBtn.addEventListener('click', () => {
  startElement = undefined;
  startElementSerial = undefined;
  imagesContainer.innerHTML = '';
  allImageElements = [];

  generateLists(minionData);

  paintToDom(imagesContainer, allImageElements);

  addDragEvents(imagesContainer);
});

playAgainBtn.addEventListener('click', playAgain);
