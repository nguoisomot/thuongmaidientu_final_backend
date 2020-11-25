var date = new Date();
console.log('the original date is ' + date);
var newdate = new Date(date);

newdate.setDate(newdate.getDate() - 7); // minus the date

var nd = new Date(newdate);
console.log('the new date is ' + nd);

var nf = new Intl.NumberFormat('de-DE');
console.log(nf.format(900000000))

