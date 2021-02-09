// Packages
const prompt = require('prompt');
var ks = require('node-key-sender');
var converter = require('number-to-words');

// Variables

// Functions
ks.setOption('globalDelayBetweenMillisec', 1);

prompt.message = ""

var jump = () => {
    ks.startBatch()
    .batchTypeKey('space', 50, ks.BATCH_EVENT_KEY_DOWN)
    .batchTypeKey('space', 150, ks.BATCH_EVENT_KEY_UP)
    ks.sendBatch();
}

prompt.get([
    {
        name: 'type',
        description: 'Enter the type of jacks',
        type: 'string',
        pattern: /(regular|grammar|hell)/,
        default: 'regular'
    },
    {
        name: 'amount',
        description: 'Enter the amount of jacks to complete',
        type: 'number',
        required: true
    },
    {
        name: 'startAt',
        description: 'Enter the position to start at',
        type: 'number',
        default: 0
    },
    {
        name: 'delay',
        description: 'Enter delay between each jump in miliseconds',
        type: 'number',
        default: 1500
    }
], (err, results) => {
    console.log('Focus on the Roblox window, initiating in 3 seconds.')

    setTimeout(() => {
        console.log(`Initiating ${results.type} jacks.\nAmount: ${results.amount}\nStarting at: ${results.startAt}\nDelay: ${results.delay}`)
        if (results.type === 'regular') {
            for (let i=results.startAt+1; i < results.amount + 1; i++) {
                setTimeout(() => {
                    var word = converter.toWords(i).toUpperCase();

                    jump();

                    setTimeout(() => ks.sendKey('slash'), 250)
                    setTimeout(() => ks.sendKeys(word.split('').map(x => x == '-' ? 'minus' : x).map(x => x == ' ' ? 'space' : x)), 500)//word.length * 110);
                    setTimeout(() => ks.sendKey('enter'), 750);
                }, ((i-results.startAt) * results.delay))
            } 
        }
        else if (results.type === 'grammar') {
            for (let i=results.startAt+1; i < results.amount + 1; i++) {
                setTimeout(() => {
                    var word = converter.toWords(i);

                    jump();

                    var formattedWord = word.split('').map(x => x == '-' ? 'minus' : x).map(x => x == ' ' ? 'space' : x)
                    formattedWord[0] = formattedWord[0].toUpperCase();

                    setTimeout(() => ks.sendKey('slash'), 250)
                    setTimeout(() => ks.sendKeys(formattedWord), 500)//word.length * 110);
                    setTimeout(() => ks.sendKey('period'), 600)
                    setTimeout(() => ks.sendKey('enter'), 750);
                }, ((i-results.startAt) * results.delay))
            }
            /*
            O
            N
            E
            ONE
            T
            W
            O
            TWO
            T
            H
            R
            E
            E
            THREE */
        }
        else if (results.type === 'hell') {
            var currentWait = 0;
            for (let i=results.startAt+1; i < results.amount + 1; i++) {
                
                
                if (i == results.startAt + 1) {
                } else {
                    currentWait += ((converter.toWords(i-1).length * results.delay) + 1200);
                }
                

                setTimeout(() => {
                    var word = converter.toWords(i).toUpperCase();

                    for (let j = 0; j < (word.length); j++) {
                        setTimeout(() => {
                            var char = word[j];
                            var formattedChar = char.replace('-', 'minus').replace(' ', 'space');
                            setTimeout(() => ks.sendKey('slash'), 250);
                            setTimeout(() => ks.sendKey(formattedChar), 750);
                            setTimeout(() => ks.sendKey('enter'), 1000);

                            setTimeout(() => jump(), 1200)
                        }, j*results.delay)
                    }

                    setTimeout(() => {
                        setTimeout(() => ks.sendKey('slash'), 250)
                        setTimeout(() => ks.sendKeys(word.split('').map(x => x == '-' ? 'minus' : x).map(x => x == ' ' ? 'space' : x)), 500)//word.length * 110);
                        setTimeout(() => ks.sendKey('enter'), 750);
                        setTimeout(() => jump(), 1000);
                    }, (word.length * results.delay) + 200)
                }, (currentWait))
            }
        }

    }, 3000)
});