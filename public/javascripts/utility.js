// public/javascripts/utility.js
class Utility{
  toKhNum(number){
    const khNum = {'0':'០', '1':'១', '2':'២', '3':'៣', '4':'៤', '5':'៥', '6':'៦', '7':'៧', '8':'៨', '9':'៩'};
    const stringNum = number.toString();
    var khString = '';
   
    for(var i in stringNum){
      var char = stringNum.charAt(i);
      khString += khNum[char];
    }
   
    return khString;
  }

  toKhDate(rawDate){
    const KhmerDays = ['អាទិត្យ', 'ច័ន្ទ', 'អង្គារ', 'ពុធ', 'ព្រហស្បតិ៍', 'សុក្រ', 'សៅរ៍'];
    const KhmerMonths = ['មករា', 'កុម្ភៈ', 'មិនា', 'មេសា', 'ឧសភា', 'មិថុនា', 'កក្កដា', 'សីហា', 'កញ្ញា', 'តុលា', 'វិច្ឆិកា', 'ធ្នូ'];

    const date = new Date(rawDate);
    const month = date.getMonth();
    const day = date.getDay();
    const daym = this.toKhNum(date.getDate());
    const year = this.toKhNum(date.getFullYear());
    
    return ('ថ្ងៃ '+KhmerDays[day]+' ទី '+daym+' '+KhmerMonths[month]+' '+year);
  }

  clock(){
    var period = 'ព្រឹក';
    var today = new Date();
    var h = today.getHours();
    if(h>12){
      h = h-12;
      period = 'ល្ងាច';
    }
    var m = today.getMinutes();
    var s = today.getSeconds();
    h = utility.toKhNum(h);
    m = utility.toKhNum(utility.checkTime(m));
    s = utility.toKhNum(utility.checkTime(s));
  
    document.getElementById('kh-clock').innerHTML = h + " : " + m + " : " + s+' '+period;
    var t = setTimeout(utility.clock, 500);
  }
  
  checkTime(i) {
    if (i < 10){i = "0" + i};  
    return i;
  }

}//end class

const utility = new Utility();