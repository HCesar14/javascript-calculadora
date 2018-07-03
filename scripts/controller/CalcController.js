class CalcController {

    constructor(){

        this._displayCalc = "0"; // _ => private 
        this._currentDate;

        this.initialize();
    }

    initialize(){

        let displayCalcEl = document.querySelector("#display");
        let dateEl = document.querySelector("#data");
        let timeEl = document.querySelector("#hora");

        displayCalcEl.innerHTML = "0";//innerHTML = pega o objeto e coloca uma informação em html
        dateEl.innerHTML = "03/07/2018";
        timeEl.innerHTML = "16:32";
    }

    get displayCalc(){
        return this._displayCalc;
    }

    set displayCalc(valor){
        this._displayCalc = valor; 
    }

    get currentDate(){
        return this._currentDate;
    }

    set currentDate(valor) {
        this._currentDate = valor;
    }

}