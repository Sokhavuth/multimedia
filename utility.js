// utility.js
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
}//end class

const utility = new Utility();

module.exports = utility;