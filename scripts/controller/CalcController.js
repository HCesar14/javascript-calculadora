class CalcController {

    constructor(){
      
        this._displayCalcEl = document.querySelector("#display"); // _ => padrao quando é private
        this._dateEl = document.querySelector("#data");
        this._timeEl = document.querySelector("#hora"); 
        this._currentDate;
        this._locale = 'pt-BR';

        this.initialize();
        this.initButtonsEvents();
    }

    initialize(){
      
        this.setDisplayDateTime();

        setInterval(() => {

          this.setDisplayDateTime();

        }, 1000); //att a cada segundo
    }

    addEventListenerAll(element, events, fn){ //botao, evento, funcao ao ocorrer o evento

        events.split(' ').forEach(event => { //separa pelo " " espaço vazio

            element.addEventListener(event, fn, false); //cria o evento passando o evento atual(click, drag), executa a função do parametro e 
            //false como tem o btn e o texto do btn acontecendo em 1 deles ja aborta o outro
        });
    }

    initButtonsEvents(){

        let buttons = document.querySelectorAll("#buttons > g, #parts > g"); // All traz todos, pega id buttons, > filhos g

        buttons.forEach((btn, index) => {

            this.addEventListenerAll(btn, 'click drag', e => { //metodo criado aqui

                console.log(btn.className.baseVal.replace("btn-", ""));
            });

            this.addEventListenerAll(btn, 'mouseover mouseup mousedown', e => {

                btn.style.cursor = 'pointer';
            });
        });
    }

    setDisplayDateTime(){

        this.displayDate = this.currentDate.toLocaleDateString(this._locale, {
            day: "2-digit",
            month: "long",
            year: "numeric"
        });
        this.displayTime = this.currentDate.toLocaleTimeString(this._locale);
    }

    get displayTime(){
        return this._timeEl.innerHTML;
    }

    set displayTime(value){
        this._timeEl.innerHTML = value;
    }

    get displayDate(){
        return this._dateEl.innerHTML;
    }

    set displayDate(value){
        this._dateEl.innerHTML = value;
    }

    get displayCalc(){
        return this._displayCalcEl.innerHTML;
    }

    set displayCalc(value){
        this._displayCalcEl.innerHTML = value; 
    }

    get currentDate(){
        return new Date();
    }

    set currentDate(value) {
        this._currentDate = value;
    }

}