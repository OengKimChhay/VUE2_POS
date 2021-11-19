// this filter glouble file can use wherever u want but must import in main.js root file let see root file (main.js)

// -------date formart filter------
import moment from 'moment';
import Vue from 'vue';

// Format date
Vue.filter('formatDate', function(value) {
  if (!value) return '';
  else{
    return moment(String(value)).format('DD/MM/YYYY h:mm a');
  }
});
// capitle latter
Vue.filter('capitaLize', function (value) {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})
// format currency .00 $
Vue.filter('toCurrency', function (value) {
  var formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
  });
  return formatter.format(value);
});
// format current ៛
Vue.filter('toCurrencyReil', function (value) {
  var formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'KHR',
      minimumFractionDigits: 2
  });
  return formatter.format(value);
});