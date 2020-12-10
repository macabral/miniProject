/*
 Copyright (c) 2012-2017 Open Lab
 Permission is hereby granted, free of charge, to any person obtaining
 a copy of this software and associated documentation files (the
 "Software"), to deal in the Software without restriction, including
 without limitation the rights to use, copy, modify, merge, publish,
 distribute, sublicense, and/or sell copies of the Software, and to
 permit persons to whom the Software is furnished to do so, subject to
 the following conditions:

 The above copyright notice and this permission notice shall be
 included in all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

function dateToRelative(localTime){
  var diff=new Date().getTime()-localTime;
  var ret="";

  var min=60000;
  var hour=3600000;
  var day=86400000;
  var wee=604800000;
  var mon=2629800000;
  var yea=31557600000;

  if (diff<-yea*2)
    ret ="in ## years".replace("##",(-diff/yea).toFixed(0));
  else if (diff<-mon*9)
    ret ="in ## months".replace("##",(-diff/mon).toFixed(0));
  else if (diff<-wee*5)
    ret ="in ## weeks".replace("##",(-diff/wee).toFixed(0));
  else if (diff<-day*2)
    ret ="in ## days".replace("##",(-diff/day).toFixed(0));
  else if (diff<-hour)
    ret ="in ## hours".replace("##",(-diff/hour).toFixed(0));
  else if (diff<-min*35)
    ret ="in about one hour";
  else if (diff<-min*25)
    ret ="in about half hour";
  else if (diff<-min*10)
    ret ="in some minutes";
  else if (diff<-min*2)
    ret ="in few minutes";
  else if (diff<=min)
    ret ="just now";
  else if (diff<=min*5)
    ret ="few minutes ago";
  else if (diff<=min*15)
    ret ="some minutes ago";
  else if (diff<=min*35)
    ret ="about half hour ago";
  else if (diff<=min*75)
    ret ="about an hour ago";
  else if (diff<=hour*5)
    ret ="few hours ago";
  else if (diff<=hour*24)
    ret ="## hours ago".replace("##",(diff/hour).toFixed(0));
  else if (diff<=day*7)
    ret ="## days ago".replace("##",(diff/day).toFixed(0));
  else if (diff<=wee*5)
    ret ="## weeks ago".replace("##",(diff/wee).toFixed(0));
  else if (diff<=mon*12)
    ret ="## months ago".replace("##",(diff/mon).toFixed(0));
  else
    ret ="## years ago".replace("##",(diff/yea).toFixed(0));
  return ret;
}

//override date format i18n

Date.monthNames = ["Janeiro","Fevereiro","Março","Abril","Mai","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];
// Month abbreviations. Change this for local month names
Date.monthAbbreviations = ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"];
// Full day names. Change this for local month names
Date.dayNames =["Domingo","Segunda-feira","Terça-feira","Quarta-feira","Quinta-feira","Sexta-feira","Sábado"];
// Day abbreviations. Change this for local month names
Date.dayAbbreviations = ["Dom","Seg","Ter","Qua","Qui","Sex","Sab"];
// Used for parsing ambiguous dates like 1/2/2000 - default to preferring 'American' format meaning Jan 2.
// Set to false to prefer 'European' format meaning Feb 1
Date.preferAmericanFormat = false;

Date.firstDayOfWeek =0;
Date.defaultFormat = "d/M/yyyy";
Date.masks = {
  fullDate:       "EEEE, MMMM d, yyyy",
  shortTime:      "h:mm a"
};
Date.today="Today";

Number.decimalSeparator = ".";
Number.groupingSeparator = ",";
Number.minusSign = "-";
Number.currencyFormat = "###,##0.00";

var millisInWorkingDay =28800000;
var workingDaysPerWeek =7;

function isHoliday(date) {
  var friIsHoly =false;
  var satIsHoly =false;
  var sunIsHoly =false;

  var pad = function (val) {
    val = "0" + val;
    return val.substr(val.length - 2);
  };

  var holidays = "##";

  var ymd = "#" + date.getFullYear() + "_" + pad(date.getMonth() + 1) + "_" + pad(date.getDate()) + "#";
  var md = "#" + pad(date.getMonth() + 1) + "_" + pad(date.getDate()) + "#";
  var day = date.getDay();

  return  (day == 5 && friIsHoly) || (day == 6 && satIsHoly) || (day == 0 && sunIsHoly) || holidays.indexOf(ymd) > -1 || holidays.indexOf(md) > -1;
}

var i18n = {
  YES:                 "Sim",
  NO:                  "Não",
  FLD_CONFIRM_DELETE:  "Confirma excluir?",
  INVALID_DATA:        "Data no formato inválido",
  ERROR_ON_FIELD:      "Erro no campo",
  OUT_OF_BOUDARIES:      "Out of field admitted values:",
  CLOSE_ALL_CONTAINERS:"fechar tudo?",
  DO_YOU_CONFIRM:      "Você confirma?",
  ERR_FIELD_MAX_SIZE_EXCEEDED:      "Tamanho máximo do campo excedido",
  WEEK_SHORT:      "W.",
  FILE_TYPE_NOT_ALLOWED:"Tipo de arquivo não permitido.",
  FILE_UPLOAD_COMPLETED:"Upload completado.",
  UPLOAD_MAX_SIZE_EXCEEDED:"Tamanho máximo de arquivo atingido",
  ERROR_UPLOADING:"Erro no upload",
  UPLOAD_ABORTED:"Upload abortado",
  DROP_HERE:"Solte os arquivos aqui",
  FORM_IS_CHANGED:     "Você possui dados não salvos!",
  PIN_THIS_MENU: "PIN_THIS_MENU",
  UNPIN_THIS_MENU: "UNPIN_THIS_MENU",
  OPEN_THIS_MENU: "OPEN_THIS_MENU",
  CLOSE_THIS_MENU: "CLOSE_THIS_MENU",
  PROCEED: "Continua?",
  PREV: "Anterior",
  NEXT: "Próximo",
  HINT_SKIP: "Got it, close this hint.",
  WANT_TO_SAVE_FILTER: "save this filter",
  NEW_FILTER_NAME: "name of the new filter",
  SAVE: "Salvar",
  DELETE: "Delete",
  HINT_SKIP: "Got it, close this hint.",
  COMBO_NO_VALUES: "no values available...?",
  FILTER_UPDATED:"Filter updated.",
  FILTER_SAVED:"Filter correctly saved."
};