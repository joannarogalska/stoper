class Stopwatch {
    constructor(display) {
        this.running = false;
        this.display = display;
        this.reset();
        this.print(this.times);
    }

    reset() {
        this.times = {
            minutes: 0,
            seconds: 0,
            miliseconds: 0
        };
    }

    print() {
        this.display.innerText = this.format(this.times);
    }

    format(times) {
        return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`;
    }

    start() {
        if (!this.running) {
            this.running = true;
            this.watch = setInterval(() => this.step(), 10);
        }
    }

    step() {
        if (!this.running) return;
        this.calculate();
        this.print();
    }

    calculate() {
        this.times.miliseconds += 1;
        if (this.times.miliseconds >= 100) {
            this.times.seconds += 1;
            this.times.miliseconds = 0;
        }
        if (this.times.seconds >= 60) {
            this.times.minutes += 1;
            this.times.seconds = 0;
        }
    }

    stop() {
        this.running = false;
        clearInterval(this.watch);
    }

    resetTimer() {
        this.stop();
        let span = document.querySelector('.results');
        var li = document.createElement('li');              // Create a <li> element
        var time = document.createTextNode(this.format(this.times));     // Create a text node
        li.appendChild(time);
        span.appendChild(li);
        this.reset();
        this.print();
        let cleanButton = document.getElementById('clean');
        cleanButton.classList.remove('hide');
    }

    clean() {
        let span = document.querySelector('.results');
        let li = span.querySelector('li');
        span.querySelectorAll('li').forEach(function(li) {
            span.removeChild(li);
        });

    }
}

const stopwatch = new Stopwatch(
    document.querySelector('.stopwatch'));

let startButton = document.getElementById('start');
startButton.addEventListener('click', () => stopwatch.start());

let stopButton = document.getElementById('stop');
stopButton.addEventListener('click', () => stopwatch.stop());

let resetButton = document.getElementById('reset');
resetButton.addEventListener('click', () => stopwatch.resetTimer());

let cleanButton = document.getElementById('clean');
cleanButton.addEventListener('click', () => stopwatch.clean());


function pad0(value) {
    let result = value.toString();
    if (result.length < 2) {
        result = '0' + result;
    }
    return result;
}