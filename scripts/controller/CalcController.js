class CalcController {

    constructor(){
      
        this._operation = [];
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

        this.setLastNumberToDisplay();
    }

    addEventListenerAll(element, events, fn){ //botao, evento, funcao ao ocorrer o evento

        events.split(' ').forEach(event => { //separa pelo " " espaço vazio

            element.addEventListener(event, fn, false); //cria o evento passando o evento atual(click, drag), executa a função do parametro e 
            //false como tem o btn e o texto do btn acontecendo em 1 deles ja aborta o outro
        });
    }

    clearAll(){

        this._operation = [];

        //atualizar display
        this.setLastNumberToDisplay();
    }

    clearEntry(){

        this._operation.pop(); //elimina o ultimo

        //atualizar display
        this.setLastNumberToDisplay();
    }

    getLastOperation(){

        return this._operation[this._operation.length-1];
    }

    setLastOperation(value){

        this._operation[this._operation.length-1] = value;
    }

    isOperator(value){

        return (['+','-','*','/','%'].indexOf(value) > -1); //verifica se existe algum dos itens do array no param, n encontra ret -1
    }

    pushOperation(value){

        this._operation.push(value);

        if(this._operation.length > 3){ //fazer contas em pares
         
            this.calc();
        }
    }

    calc(){

        let last = '';

        if(this._operation.length > 3){
            last = this._operation.pop();
        }

        let result = eval(this._operation.join('')); //eval funcao propria do js que executa js dentro de string
            //join = toString so que pode escolher um delimitador no caso aqui é nenhum

        if(last == '%') {

            result /= 100;

            this._operation = [result];
        } else {
            
            this._operation = [result];

            if(last) this._operation.push(last);
        }     

        //atualizar display
        this.setLastNumberToDisplay();
    }

    setLastNumberToDisplay(){

        let lastNumber;

        for(let i = this._operation.length-1; i >= 0; i--){

            if(!this.isOperator(this._operation[i])){ //numero
                lastNumber = this._operation[i];
                break; // para o for
            }
        }

        if(!lastNumber) lastNumber = 0;

        this.displayCalc = lastNumber;
    }

    addOperation(value){

        if(isNaN(this.getLastOperation())) { //verifica o que já estava se não é numero
            //string
            
            if(this.isOperator(value)){
                //trocar o operador

                this.setLastOperation(value);
            }else if (isNaN(value)){
                //outra coisa

                console.log('outra coisa');

            } else {

                //primeiro num digitado
                this.pushOperation(value);

                //atualizar display
                this.setLastNumberToDisplay();

            }
        } else { //numero ou .

            if(this.isOperator(value)){ //verifica se o atual é um operador
                
                this.pushOperation(value);
            } else { //não é operador - é um numero

                let newValue = this.getLastOperation().toString() + value.toString();
                this.setLastOperation(parseInt(newValue));

                //atualizar display
                this.setLastNumberToDisplay();
            }
            
        }   
    }

    setError(){

        this.displayCalc = "error";
    }

    execBtn(value) {

        switch (value) {

            case 'ac':
                this.clearAll();
            break;
            case 'ce':
                this.clearEntry();
            break;
            case 'ponto':
                this.addOperation('.');
            break;
            case 'soma':
                this.addOperation('+');
            break;
            case 'subtracao':
                this.addOperation('-');  
            break;
            case 'divisao':
                this.addOperation('/');  
            break;
            case 'multiplicacao':
                this.addOperation('*');
            break;
            case 'porcento':
                this.addOperation('%'); //em js é modulo
            break;
            case 'igual':
                this.calc();
            break;
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.addOperation(parseInt(value));
            break; // so tem break no ultimo pq eles sempre executam o mesmo comando
            default:
                this.setError();
            break;
            
        }
    }

    initButtonsEvents(){

        let buttons = document.querySelectorAll("#buttons > g, #parts > g"); // All traz todos, pega id buttons, > filhos g

        buttons.forEach((btn, index) => {

            this.addEventListenerAll(btn, 'click drag', e => { //metodo criado aqui

                let textBtn = btn.className.baseVal.replace("btn-", "");

                this.execBtn(textBtn);
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