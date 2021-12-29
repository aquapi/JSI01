class Clock {
    /**
     * @param {{template: string}} param
     */
    constructor({ template }) {
        this.template = template;
    }

    // Thay cho render nhung tra ve output
    getTime() {
        const date = new Date;
        // Hours
        let a;
        return this.template
            .replace('h', (
                (a = date.getHours()) < 10 ? '0' : ''
            ) + a)
            .replace('m', (
                (a = date.getMinutes()) < 10 ? '0' : ''
            ) + a)
            .replace('s', (
                (a = date.getSeconds()) < 10 ? '0' : ''
            ) + a);
    }

    stop = () => clearInterval(this.timer);
    start() {
        this.timer = setInterval(() => console.log(this.getTime()), 1000);
    }
}

class ModernClock extends Clock {
    /**
     * @param {{template: string, ms: number}} param
     */
    constructor({ template, msDelay = 1000 }) {
        super({ template });
        this.ms = msDelay;
    }

    start() {
        this.timer = setInterval(() => console.log(this.getTime()), this.ms);
    }
}

new ModernClock({
    template: "hH:mM:sS",
    msDelay: 500
}).start();