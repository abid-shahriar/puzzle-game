var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var minionData = [
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
var imagesContainer = document.getElementById('images-container');
var puzzleBox = document.querySelector('.puzzle-box');
var shuffleBtn = document.getElementById('shuffle-btn');
var message = document.querySelector('.message');
var doneMessage = document.querySelector('.done-message');
var playAgainBtn = document.getElementById('play-again-btn');
var startElement = undefined;
var startElementSerial = undefined;
var allImageElements = [];
generateLists(minionData);
paintToDom(imagesContainer, allImageElements);
addDragEvents(imagesContainer);
// create image elements from the data
function generateLists(arr) {
    arr
        .map(function (item) { return ({ value: item, num: Math.random() }); })
        .sort(function (a, b) { return a.num - b.num; })
        .map(function (_a) {
        var value = _a.value;
        return value;
    })
        .forEach(function (item, index) {
        var imgContainer = document.createElement('div');
        imgContainer.setAttribute('data-index', "" + index);
        imgContainer.innerHTML = "<img class='img' serial-index=\"" + item.id + "\" draggable=\"true\" src=\"" + item.img + "\" />";
        allImageElements.push(imgContainer);
    });
}
// paint all the image tags on DOM
function paintToDom(parentElement, arr) {
    arr.forEach(function (element) {
        parentElement.appendChild(element);
    });
}
// add all drag events to all the images
function addDragEvents(parentElement) {
    var allChildren = __spreadArray([], parentElement.children);
    allChildren.forEach(function (item) {
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
    var allContainers = document.querySelectorAll('#images-container > div');
    var serialIndex = +this.closest('div').getAttribute('data-index');
    var dropElement = allImageElements[serialIndex].querySelector('.img');
    this.classList.remove('over');
    allContainers[serialIndex].innerHTML = '';
    allContainers[startElementSerial].innerHTML = '';
    allContainers[serialIndex].appendChild(startElement);
    allContainers[startElementSerial].appendChild(dropElement);
    puzzleDone();
}
function puzzleDone() {
    var allContainers = document.querySelectorAll('#images-container > div > img');
    var matchedElements = minionData.filter(function (item, idx) { return +allContainers[idx].getAttribute('serial-index') === item.id; });
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
shuffleBtn.addEventListener('click', function () {
    startElement = undefined;
    startElementSerial = undefined;
    imagesContainer.innerHTML = '';
    allImageElements = [];
    generateLists(minionData);
    paintToDom(imagesContainer, allImageElements);
    addDragEvents(imagesContainer);
});
playAgainBtn.addEventListener('click', playAgain);
