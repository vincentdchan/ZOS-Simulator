const resources = "トーマス・アンダーソンは、大手ソフトウェア会社のメタ・コーテックス[3]に勤めるプログラマである。しかし、トーマスにはあらゆるコンピュータ犯罪を起こす天才ハッカー[4]ネオという、もう1つの顔があった。平凡な日々を送っていたトーマスは、ここ最近、起きているのに夢を見ているような感覚に悩まされ「今生きているこの世界は、もしかしたら夢なのではないか」という、漠然とした違和感を抱いていたが、それを裏付ける確証も得られず毎日を過ごしていた。" +
"ある日、トーマスは「起きろ、ネオ」「マトリックスが見ている」「白ウサギについて行け」という謎のメールを受け取る。ほどなくしてトリニティと名乗る謎の女性と出会ったトーマスは、トリニティの仲間のモーフィアスを紹介され「貴方が生きているこの世界は、コンピュータによって作られた仮想現実だ」と告げられ、このまま仮想現実で生きるか、現実の世界で目覚めるかの選択を迫られる。日常の違和感に悩まされていたトーマスは現実の世界で目覚める事を選択する。次の瞬間、トーマスは自分が培養槽のようなカプセルの中に閉じ込められ、身動きもできない状態であることに気付く。トリニティ達の言ったことは真実で、現実の世界はコンピュータの反乱[5]によって人間社会が崩壊し、人間の大部分はコンピュータの動力源として培養されていた。覚醒してしまったトーマスは不良品として廃棄されるが、待ち構えていたトリニティとモーフィアスに救われた。" +
"トーマスは、モーフィアスが船長を務める工作船「ネブカドネザル号」の仲間として迎えられ、ハッカーとして使っていた名前「ネオ」を名乗ることになった。モーフィアスはネオこそがコンピュータの支配を打ち破る救世主であると信じており、仮想空間での身体の使い方や、拳法などの戦闘技術を習得させた。人類の抵抗軍の一員となったネオは、仮想空間と現実を行き来しながら、人類をコンピュータの支配から解放する戦いに身を投じる事になった。" +
"《黑客帝国》（英语：The Matrix）是一部1999年的好莱坞科幻电影，由沃卓斯基姐妹执导，基努·里维斯、劳伦斯·菲什伯恩、凯莉·安摩丝及雨果·威文等人主演，并由香港电影界的袁和平担任武术指导。此片以其独到的哲学和子弹时间的特殊慢镜头及各式电脑特效著名，在全球获取亮眼票房，并在2003年，推出续集《黑客帝国2：重装上阵》及第三集《黑客帝国3：矩阵革命》";

function ShuffleString(str, len) {
    let result = "";
    let str_len = str.length;
    for (let i = 0; i < len; i++) {
        let rd = Math.round(Math.random(new Date()) * str_len);
        result += str[rd];
    }
    return result;
}

const total_level = 128;
const black_level = 72;

export class VirtualLine {

    constructor(x_offset, width, height, font_width, font_height) {
        this._x_offset = x_offset;
        this._width = width;
        this._height = height;

        this._font_width = font_width;
        this._font_height = font_height;

        this._content = ShuffleString(resources, total_level);

        this._tick = total_level;
        this._offset_step = Math.round(Math.random() * total_level);
    }

    paint(ctx, deltaTime) {
        const text_length = Math.ceil(this._height / this._font_height);
        for (let i = 0; i < text_length; i++) {
            const absolute_level = (i + this._offset_step - this._tick) % total_level + total_level;
            if (absolute_level > black_level) {
                const color_level = absolute_level - black_level;
                const green_level = Math.round((color_level / (total_level - black_level)) * 255);
                if (green_level === 255) {
                    ctx.shadowColor = "white";
                    ctx.shadowOffsetX = 0;
                    ctx.shadowOffsetY = 0;
                    ctx.shadowBlur = 10;
                    ctx.fillStyle = "rgb(20," + green_level.toString() + ",20)"; 
                } else {
                    ctx.shadowBlur = 0;
                    ctx.fillStyle = "rgb(0," + green_level.toString() + ",0)"; 
                }
                ctx.fillText(this._content[i], this._x_offset, i * this._font_height);
            }
        }
        this._tick++;

        const test_level = (this._offset_step - this._tick) % total_level + total_level;
        if (test_level === 1) {
            this._content = ShuffleString(resources, total_level);
        }
        /*
        if (this._tick % this._offset_step === 0) {
            this._content = ShuffleString(resources);
        }
        */
    }

    get x_offset() {
        return this._x_offset;
    }

    get width() {
        return this._width;
    }

    set width(value) {
        this._width = value;
    }

    get height() {
        return this._height;
    }

    set height(value) {
        this._height = value;
    }

}
